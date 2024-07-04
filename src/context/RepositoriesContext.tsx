import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { repositories, RepositoriesGetParams, RepositoriesGetResponse } from '../actions';


type RepositoriesContextProps = {
  children: ReactNode;
}

export type RepositoriesContextT = RepositoriesGetResponse & {
  isLoading: boolean;
  totalPages: number;
  params: RepositoriesGetParams;
  goto: (params?: Partial<RepositoriesGetParams>) => void;
};

export type RepositoriesContextState = Omit<RepositoriesContextT, 'goto'> & { goto?: RepositoriesContextT['goto'] };

const defaultState: RepositoriesContextState = {
  isLoading: true, // simple isLoading state for testing purposes, could have more complex structure,
  items: [],
  total: 0,
  totalPages: 0,
  params: {
    page: 1,
    perPage: 10
  }
};

const RepositoriesContext = createContext<RepositoriesContextState>(defaultState);

const RepositoriesProvider = ({ children }: RepositoriesContextProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get only the params we need
  const getParamsObject = () => {
    const page = Number(searchParams.get('page') || defaultState.params.page);
    const perPage = Number(searchParams.get('perPage') || defaultState.params.perPage);
    return {
      page,
      perPage
    }
  };

  const [params, setParams] = useState(getParamsObject);
  const [state, setState] = useState<RepositoriesContextState>(() => {
    return { ...defaultState, params };
  });

  const fetchRepositories = async () => {
    try {
      setState({ ...state, isLoading: true });
      const data = await repositories.get(params);
      // github only allows the fist 1000 results
      const totalPages = Math.ceil(data.total / state.params.perPage);
      setState({
        ...state,
        ...data,
        totalPages: totalPages > 100 ? 100 : totalPages,
        isLoading: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  // first load
  useEffect(() => {
    fetchRepositories();
  }, [params]);

  // consecutive calls to set params, i.e. on page change
  useEffect(() => {
    // fetch only when params are different
    const newParams = getParamsObject();
    if (newParams.perPage !== params.perPage || newParams.page !== params.page) {
      setParams(newParams);
    }
  }, [location.search]);

  const goto = useCallback((optionalParams?: Partial<RepositoriesGetParams>) => {
    const newParams = { ...params, ...optionalParams };
    navigate(`/?perPage=${newParams.perPage}&page=${newParams.page}`)
  }, []);

  const context = { ...state, goto };

  return (
    <RepositoriesContext.Provider value={context}>
      {children}
    </RepositoriesContext.Provider>
  );
}

export { RepositoriesContext, RepositoriesProvider };

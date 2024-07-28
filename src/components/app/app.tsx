import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingridientsSlice';
import { ProtectedRoute } from '../protecktedRouter/';
import { ProtectedAuthRoute } from '../protecktedRouter/';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userInfo.isAuthrized);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route
          element={<ProtectedRoute isAuthenticated={isAuth} />}
          children={
            <>
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/orders' element={<ProfileOrders />} />
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal
                    title={'Детали заказа'}
                    onClose={() => navigate('/profile/orders')}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            </>
          }
        />
        <Route
          element={<ProtectedAuthRoute isAuthenticated={isAuth} />}
          children={
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
            </>
          }
        />

        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингредиента'} onClose={() => navigate('/')}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            element={<ProtectedRoute isAuthenticated={false} />}
            children={
              <>
                <Route
                  path='/profile/orders/:number'
                  element={
                    <Modal
                      title='Детали заказа'
                      onClose={() => navigate('/profile/orders')}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

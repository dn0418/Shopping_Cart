import { useState, useEffect } from 'react';

import { CgShoppingBag, CgCheckO } from 'react-icons/cg';

import { useCartContext } from 'hooks/useCartContext';
import { useCart } from 'hooks/useCart';
import { useKeyDown } from 'hooks/useKeyDown';

import CartItem from 'pages/Cart/CartItem';

import Button from 'components/Button';
import Toast from 'components/Toast';
import ToastMessage from 'components/ToastMessage';

import { addAllItemsPrice } from 'helpers/item';

import styles from './index.module.scss';

const CartContent = ({ toggleCartModal }) => {
  const { items, totalAmount } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  useKeyDown(() => {
    toggleCartModal();
  }, ['Escape']);

  if (items.length === 0) {
    return (
      <>
        <Toast>
          {toastMessage && (
            <ToastMessage toggleToast={toggleToast} content={toastMessage} />
          )}
        </Toast>
        <div className={styles.empty}>
          <p className={styles.no_products}>No hay productos en el carrito</p>
          <Button
            className={`${styles.button} ${styles.empty_button}`}
            to="/categorias/productos"
            onClick={toggleCartModal}
          >
            Agrega productos
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.list_wrapper}>
            <div className={styles.list}>
              {items.map((item) => (
                <CartItem
                  toggleCartModal={toggleCartModal}
                  key={item.id}
                  item={item}
                  model={item.model}
                  type={item.type}
                  color={item.color}
                  size={item.size}
                  price={item.price}
                  url={item.url}
                  amount={item.amount}
                  _thumbnail={item.thumbnail}
                  addItem={addItem}
                  removeItem={removeItem}
                  deleteItem={deleteItem}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.footer_container}>
          <div className={styles.footer_wrapper}>
            <p>
              <span>Total: ${addAllItemsPrice(items)} </span> | {totalAmount}{' '}
              {+totalAmount > 1 ? 'items' : 'item'}
            </p>
            <div className={styles.buttons_wrapper}>
              <Button
                className={`${styles.button} ${styles.cart_button}`}
                to="/carrito"
                onClick={toggleCartModal}
              >
                Carrito{' '}
                <span>
                  <CgShoppingBag />
                </span>
              </Button>
              <Button
                className={`${styles.button} ${styles.checkout_button}`}
                to="/checkout"
                onClick={toggleCartModal}
              >
                Checkout{' '}
                <span>
                  <CgCheckO />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
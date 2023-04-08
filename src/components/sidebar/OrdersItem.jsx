import { Badge } from "primereact";
import React, { useEffect, memo, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../../config";
import { increaseOrdersCount, resetOrdersCount } from "../../store/orders";
import { isAuthenticated } from "../../utils/helpers";
import notificationSound from '../../assets/ordernotification.mp3'

const OrdersItem = () => {
  const pathname = useLocation().pathname;

  const notificationSoundRef = useRef(null);

  const newOrdersCount = useSelector(state => state.orders.newOrdersCount)
  const dispatch = useDispatch();

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/sse`);
    eventSource.onmessage = event => {
      const data = JSON.parse(event.data);
      dispatch(increaseOrdersCount(data));

      notificationSoundRef.current.play()

      toast.success('you have a new order',{
        duration: 5000,
        position: 'top-center',
        icon: '👏',
      })
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {

    if(pathname === '/orders') {
        dispatch(resetOrdersCount())
    }

  },[pathname])

  return (
    <>
      {isAuthenticated() && (
        <li className="sidebar__item">
          <Link
            className={
              pathname === "/orders" ? "sidebar__link active" : "sidebar__link"
            }
            to="/orders"
          >
            <div className="flex align-items-center gap-4">
            <div className="flex align-items-center">
              <span className="sidebar__MenuItemIcon">
                <i className="pi pi-shopping-cart" />
              </span>
              Orders
            </div>
            {newOrdersCount.length > 0 ? (
              <Badge value={'+' + newOrdersCount.length} severity="warning" />
            ) : null}
            </div>
          </Link>
        </li>
      )}
      <audio src={notificationSound} ref={notificationSoundRef} />
    </>
  );
};

export default memo(OrdersItem);

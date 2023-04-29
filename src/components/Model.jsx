import React from "react";
import { useDispatch } from "react-redux";
import { closeModel } from "../features/models/modelSlice";
import { clearCart } from "../features/cart/CartItemSlice";

function Model() {
  const dispatch = useDispatch();
  return (
    // <aside className="model-container">
    //   <div>Are You Sure you want to clear the Cart?</div>
    //   <div className="btn-contaner">
    //     <button className="btn-confirm">Cofirm</button>
    //     <button className="btn-cancel">Cancel </button>
    //   </div>
    // </aside>

    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModel());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModel())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Model;

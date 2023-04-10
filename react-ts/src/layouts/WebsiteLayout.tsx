import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IProduct } from "../models";
import AdminLayout from "./AdminLayout";
const dashboard = (role) => {
  if(role=="admin"){
    return (
      <li className="block w-full">
        <a
          href="#"
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          role="menuitem"
        >
          <div className="inline-flex items-center"><a href="/admin/products">Trang quản trị</a></div>
        </a>
      </li>
    );
  }
};
interface IProps {
  cart: IProduct[];
}
const WebsiteLayout = (props: IProps) => {
  const user = JSON.parse(localStorage.getItem("acc")!);

  const [cart, setCart] = useState<IProduct[]>();
  useEffect(() => {
    console.log("load lại cart");

    setCart(props.cart);
  }, [props.cart]);
  return (
    <>
      <header className="bg-red-500 h-[64px] mb-[60px]">
        <div className="container  flex justify-evenly">
          <img
            className="w-[65px] h-[95%] mt-1"
            src=" http://localhost:5173/public/images/logo.png"
            alt=""
          />
          <input
            className="w-[40%] h-[34px] px-2 mt-4 rounded-sm"
            type="text"
            placeholder="Search"
          />

          <div className="relative">
            <a href="/cart">
              {" "}
              <img
                className="w-[30px] h-[30px]  mt-4"
                src="http://localhost:5173/public/images/shopping-cart.png"
              />
            </a>
            <div className="bg-white rounded-[50%] text-center w-[20px] h-[20px] absolute top-8 left-4 text-red-500 font-medium leading-5">
              {(cart?.length)?cart?.length:"0"}
            </div>
          </div>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              data-dropdown-toggle="language-dropdown-menu"
              className="  inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <img
                className="w-[50px] h-[50px] rounded-[50%] mr-3"
                src={user.images}
                alt=""
              />
              {user.name}
            </button>

            <div
              className=" hidden z-50 w-[200px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700  "
              id="language-dropdown-menu"
              data-popper-placement="bottom"
            >
              <ul className=" py-2 font-medium" role="none">
                <li className=" w-full">
                  <a
                    href="#"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">English (US)</div>
                  </a>
                </li>
                {dashboard(user.role)}
                <li className="block w-full">
                  <a
                    href="#"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">English (US)</div>
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="mobile-menu-language-select"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-language-select"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Content */}
      <Outlet />
      <footer className="">
        <div className="lg:px-[100px] grid grid-cols-4 gap-10 mt-[100px] max-sm:grid-cols-2 px-[20px]">
          <ul className="">
            <li>
              <h2>Tìm cửa hàng</h2>
            </li>
            <li className="text-[12px]">Tìm cửa hàng gần nhất</li>
            <li className="text-[12px]">Mua hàng từ xa</li>
            <li className="text-red-500 text-[12px]">
              Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)
            </li>
            <li>Phương thức thanh toán</li>
            <li className="grid grid-cols-4">
              <img src="http://localhost:5173/public/images/tt1.png" alt="" />
              <img src="http://localhost:5173/public/images/tt2.png" alt="" />
              <img src="http://localhost:5173/public/images/tt3.png" alt="" />
              <img src="http://localhost:5173/public/images/tt4.png" alt="" />
              <img
                className="mt-4"
                src="http://localhost:5173/public/images/tt5.png"
                alt=""
              />
            </li>
          </ul>

          <ul>
            <li className="text-[12px]">Gọi mua hàng: 1800.2044(8h30-22h00)</li>
            <li className="text-[12px]">
              Gọi khiếu nại: 1800.2063(8h30-21h30)
            </li>
            <li className="text-[12px]">Gọi bảo hành 1800.2064(8h30-21h00)</li>
            <li className="text-[16px]">Đối tác dịch vụ bảo hành</li>
            <li className="text-[12px]">Điện Thoại - Máy tính</li>
            <li className="text-[16px]">Trung tâm bảo hành uỷ quyền Apple</li>
            <li>
              <img
                src="http://localhost:5173/public/images/dienthoaivui.png"
                alt=""
              />
            </li>
          </ul>

          <ul>
            <li className="text-[12px]">Mua hàng và thanh toán Online</li>
            <li className="text-[12px]">Mua hàng trả góp Online</li>
            <li className="text-[12px]">Tra thông tin đơn hàng</li>
            <li className="text-[12px]">Tra điểm Smember</li>
            <li className="text-[12px]">Tra thông tin bảo hành</li>
            <li className="text-[12px]">Tra cứu hoá đơn VAT điện tử</li>
            <li className="text-[12px]">Trung tâm bảo hành chính hãng</li>
            <li className="text-[12px]">Quy định về việc sao lưu dữ liệu</li>
            <li className="text-[12px]">Dịch vụ bảo hành điện thoại</li>
          </ul>

          <ul>
            <li className="text-[12px]">Quy chế hoạt động</li>
            <li className="text-[12px]">Chính sách Bảo hành</li>
            <li className="text-[12px]">Liên hệ hợp tác kinh doanh</li>
            <li className="text-[12px]">Khách hàng doanh nghiệp (B2B)</li>
            <li className="text-[12px]">Ưu đãi thanh toán</li>
            <li className="text-[12px]">Tuyển dụng</li>
          </ul>
        </div>
        <div className="bg-gray-100  mt-10  h-auto py-5">
          <div className="lg:px-[100px] grid grid-cols-3 gap-10  max-sm:grid-cols-2 px-[20px]">
            <ul>
              <li className="text-[12px]">
                Điện thoại iPhone 13-Điện thoại iPhone 13-Điện thoại iPhone 13
              </li>
              <li className="text-[12px]">
                Điện thoại iPhone 13-Điện thoại iPhone 13-Điện thoại iPhone 13
              </li>
              <li className="text-[12px]">
                Điện thoại iPhone 13-Điện thoại iPhone 13-Điện thoại iPhone 13
              </li>
            </ul>
            <ul>
              <li className="text-[12px]">
                Điện thoại Samsung-Điện thoại Samsung-Điện thoại Samsung
              </li>
              <li className="text-[12px]">
                Điện thoại Samsung-Điện thoại Samsung-Điện thoại Samsung
              </li>
              <li className="text-[12px]">
                Điện thoại Samsung-Điện thoại Samsung-Điện thoại Samsung
              </li>
            </ul>
            <ul>
              <li className="text-[12px]">
                Điện thoại Samsung-Điện thoại Samsung-Điện thoại Samsung
              </li>
              <li className="text-[12px]">
                Điện thoại Samsung-Điện thoại Samsung-Điện thoại Samsung
              </li>
              <li className="text-[12px]">
                Điện thoại Samsung-Điện thoại Samsung-Điện thoại Samsung
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default WebsiteLayout;

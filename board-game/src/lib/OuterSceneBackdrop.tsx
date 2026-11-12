import outerBamboo from '../assets/backgrounds/bamboo-sunset-user.png'

// Nền ngoài khung nâu dùng chung cho mọi màn hình (Home, Chọn Bàn, Chơi với máy,
// Vị trí tùy chỉnh, bàn cờ, Cửa hàng) để khu vực ngoài khung luôn giống nhau.
// Component chỉ render nền; mỗi trang giữ riêng bố cục của mình.
export function OuterSceneBackdrop() {
  return <>
    <img src={outerBamboo} alt="" aria-hidden="true" className="pointer-events-none absolute -inset-[3%] -z-20 h-[106%] w-[106%] max-w-none object-cover object-center brightness-[0.58] blur-[1px]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(4,12,8,.18),rgba(4,12,8,.18))]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_38%,#09060466_48%,#09060444_58%,transparent_82%)]" />
  </>
}

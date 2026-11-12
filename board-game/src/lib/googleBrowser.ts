/** Google authentication must run in a full browser, not an app WebView. */
export function googleBrowserError(userAgent: string, link = false): string {
  if (!/Zalo|FBAN|FBAV|Instagram|\bLine\/|;\s*wv\b|\bWebView\b/i.test(userAgent)) return ''
  return link
    ? 'Trình duyệt trong ứng dụng không hỗ trợ liên kết Google. Đừng xóa dữ liệu hoặc tạo tài khoản khách mới. Hãy quay lại trình duyệt đã tạo tài khoản khách để liên kết; nếu tài khoản chỉ có trong ứng dụng này, cần hỗ trợ chuyển tài khoản trước.'
    : 'Hãy mở link game bằng Chrome hoặc Safari rồi đăng nhập Google. Trình duyệt bên trong Zalo, Facebook hoặc ứng dụng có thể làm trang Google bị trắng.'
}

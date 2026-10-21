/** Google permits plain HTTP only for loopback development, never raw LAN IPs. */
export function googleOriginError({ protocol, hostname }: Pick<Location, 'protocol' | 'hostname'>) {
  const loopback = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]' || hostname.endsWith('.localhost')
  if (loopback && (protocol === 'http:' || protocol === 'https:')) return ''
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname) || hostname.includes(':')) {
    return 'Google không hỗ trợ đăng nhập qua địa chỉ IP LAN. Hãy mở game bằng tên miền HTTPS đã đăng ký với Google; Chơi như khách vẫn dùng được trên LAN.'
  }
  return protocol === 'https:' ? '' : 'Đăng nhập Google cần tên miền HTTPS đã đăng ký với Google. Địa chỉ HTTP hiện tại chỉ dùng Chơi như khách.'
}

# Google Sign-In — 2026-10-16

## Cấu hình local

Trong `board-game/.env`, tự điền cùng một OAuth **Web application Client ID**:

```ini
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Không dùng Client Secret. `.env` bị Git ignore. `VITE_` chỉ chứa Client ID công khai; DB password và backend code không đưa vào frontend.

Trong Google Cloud → Google Auth Platform/Credentials, thêm **Authorized JavaScript origins** đúng origin sử dụng, gồm giao thức và port, không có path:

- `http://localhost:5173` cho Vite.
- `http://localhost:3001` cho bản build/backend.
- Nếu dùng `127.0.0.1` thay `localhost`, đăng ký origin tương ứng riêng. Không trộn hostname giữa các bước vì cookie khác nhau.

Cấu hình consent screen/audience; nếu app đang Testing thì thêm Google account vào Test users theo cấu hình dự án Google. Flow dùng GIS popup/callback nên không cần Client Secret hay redirect endpoint code-exchange.

Từ `board-game/`:

```powershell
npm.cmd run db:migrate
npm.cmd run db:verify
npm.cmd run dev
```

Sau thay đổi `.env`, khởi động lại cả Vite/backend. Bản production local cần `npm.cmd run build` rồi `npm.cmd start` để Vite đưa Client ID mới vào bundle.

## Kiểm tra bằng tài khoản Google thật

1. Mở `http://localhost:5173` (hoặc origin đã đăng ký). Nút do SDK GIS render mở Google popup/account chooser thật, không dùng One Tap làm nút giả.
2. Guest đang sử dụng: mở hồ sơ chính mình từ Home → Liên kết tài khoản → chọn Google. Kiểm tra ID nội bộ/public ID, Elo, vàng, lịch sử, saved/social/honors vẫn như trước. Tên Guest giữ nguyên cho đến khi người dùng tự đổi; bút đổi tên dùng quy tắc một lần hiện có.
3. Đăng xuất, bấm Google từ trang đăng nhập: trở về đúng user đã liên kết, kể cả ở trình duyệt khác. Đổi tên thành công lần đầu rồi không được đổi thêm.
4. Từ Guest khác, thử liên kết cùng Google: báo 409, không đổi user/không gộp dữ liệu. Muốn vào user Google cũ, đăng xuất Guest rồi đăng nhập Google. Credential của Guest khác vẫn được giữ để có thể chọn Chơi như khách lại.
5. Người mới chưa có Guest/session: Google tạo user mới với public ID8 số, guest_code6 số unique, Elo1000 mỗi variant, vàng0/năng lượng5.

Chưa thể kiểm tra popup với Google thật nếu chưa điền Client ID và cấu hình Cloud. Kiểm thử tự động chỉ mock ranh giới Google verification, không giả lập việc đã được Google cấp credential thật.

## Kiến trúc và bảo mật

- Frontend tải `https://accounts.google.com/gsi/client`, dùng `initialize`/`renderButton`, popup và `auto_select:false`; callback gửi duy nhất credential về API. Không decode token để cấp quyền, không lưu token vào localStorage hoặc log token.
- `POST /api/account/google/nonce`: nonce ngẫu nhiên256 bit, cookie HttpOnly/SameSite Strict, TTL5 phút, challenge một lần trong RAM được ràng buộc với cookie session hiện tại. Restart server làm challenge cũ hết hiệu lực; client có thể thử lại.
- `POST /api/account/google`: tiêu thụ challenge, backend `google-auth-library.verifyIdToken({idToken,audience:GOOGLE_CLIENT_ID})` kiểm tra chữ ký/issuer/expiry/audience; kiểm tra thêm nonce và claim, chỉ lấy `sub` làm định danh. Bỏ qua email và user_id client gửi.
- Challenge ràng buộc cả user/session: nếu phiên Guest hết hạn giữa lúc mở popup và lúc hoàn thành, trả401 thay vì tạo user mới. Nút Liên kết yêu cầu session hợp lệ ngay từ bước nonce.
- `AccountService → AccountRepository`: transaction lock user, unique `users.google_sub` (ascii_bin) phân xử collision/race. Guest link cập nhật chính user đó; Google đã tồn tại đăng nhập lại cùng user. Nếu đang có session của user khác, trả409, không tự gộp/chuyển dữ liệu. User disabled không đăng nhập.
- Liên kết thu hồi `guest_device_hash` của chính user được link, ngăn credential Guest cũ dùng để vào account Google. `resumeGuest` kiểm tra lại hash/linked/status trong UPDATE để tránh race với link. Không xóa cookie device của Guest khác trên trình duyệt.
- Tái dùng session hiện có: cookie `ct_guest_session` HttpOnly, Strict, Secure trong production HTTPS; token256 bit chỉ lưu SHA-256 trong MySQL. Login/link xoay token, phiên mới TTL30 ngày ở DB. Guest mới/resume cũng được TTL30 ngày; phiên legacy có expiry NULL giữ tương thích cho đến khi xoay token hoặc logout. Mỗi user vẫn chỉ có một session hoạt động như kiến trúc cũ.
- Logout xóa hash session/cookie; frontend `disableAutoSelect`, ngắt socket theo luồng cũ. Socket.IO handshake và từng command qua `RoomPersistence.authorize` dùng cùng hash/expiry. Link ở Home reconnect socket với cookie mới; không thay gameplay.
- Giữ middleware kiểm tra Origin hiện có; API Google không nhận actor user_id từ client. Không có secret/email logging.

## Schema và kiểm chứng

Migration mới `004_google_identity.sql`, chỉ thêm `google_sub`, unique index và `session_expires_at` vào users. Không sửa001/002/003; không cần bảng identity riêng khi hiện chỉ có một provider Google/user. Migration không tự chạy khi backend start.

Kiểm thử:

- `google-identity.test.ts`: token giả, audience/nonce/issuer/expiry và sub không hợp lệ.
- `google-button.test.tsx`: SDK popup/nonce và credential đi qua entry flow.
- `account-persistence.integration.test.ts` trên MySQL tạm: Guest link giữ user/public ID/Elo/vàng/energy/saved/social/honors, rename một lần, Google cũ/mới, conflict/race unique, nonce replay, session hết hạn, logout/API/socket, Guest credential sau link.
- Các test Guest entry, logout, migration, repository, HTTP/socket cũ được chạy cùng để đối chiếu hồi quy.

Tài liệu Google chính thức: [GIS JavaScript API](https://developers.google.com/identity/gsi/web/reference/js-reference), [verify ID token](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token).

## File thay đổi trong nhiệm vụ

- Backend: `server/services/googleIdentity.ts` (mới), `accountService.ts`; `server/controllers/accountController.ts`; `server/repositories/accountRepository.ts`, `migrationRepository.ts`.
- Migration mới: `server/migrations/004_google_identity.sql` (1 ALTER TABLE).
- Frontend: `src/services/googleIdentity.ts` (mới), `accountApi.ts`; `src/store/entryStore.ts`; `src/pages/login/LoginPage.tsx`; `src/features/lobby/components/GoogleSignInButton.tsx`, `GoogleLinkDialog.tsx` (mới), `ProfileDialog.tsx`.
- Tests: `tests/google-identity.test.ts`, `google-button.test.tsx` (mới); mở rộng `account-persistence.integration.test.ts`.
- Cấu hình/package: `.env.example`, `package.json`, `package-lock.json`; root `.gitignore` chỉ thêm ignore cache npm local. Package mới `google-auth-library`.
- Tài liệu: root `AGENTS.md`, `PROGRESS.md`, `docs/PROJECT-MEMORY.md`, `ACCOUNT-MODEL.md`, `MYSQL-INTEGRATION.md`, tài liệu này; build cập nhật `dist/`.

Kết quả: migration004 đã apply1 bước trên cotuong, db:verify/db:check PASS; MySQL tạm migrate28/rerun0/verify/smoke PASS;30 test liên quan PASS,9/9 integration PASS; typecheck/build PASS. Không chạy toàn bộ suite ngoài phạm vi auth ở lượt này. Không có Client ID thật trong bản build hiện tại nên nhánh GIS production sẽ được Vite đưa vào khi điền Client ID và build lại; dev cần restart Vite/backend. Popup Google thật chưa kiểm chứng.
- Thông báo conflict khi liên kết Google đã rút gọn thành: “Google này đã thuộc tài khoản khác.”

2026-10-18: Guest chưa liên kết có auto-restore bằng cookie thiết bị khi /me401 qua POST /guest/restore; endpoint chỉ resume và không tạo mới. Google logout/link vẫn revoke session/device hash như trước, credential Guest đã bị thu hồi không dùng để bypass Google. Xem ACCOUNT-MODEL.md.


## Đăng nhập từ điện thoại qua LAN — 2026-10-20

Google không cho Authorized JavaScript origin dùng IP LAN thô (kể cả có HTTPS); HTTP chỉ được ngoại lệ cho localhost/loopback. Vì vậy `http://192.168.1.12:5173` dùng được Chơi như khách, nhưng không đăng nhập Google. Muốn dùng Google từ điện thoại cần tên miền HTTPS hợp lệ đã thêm chính xác origin vào Google Cloud; frontend/backend giữ cùng Client ID. Không dùng frontend flag, token giả hoặc localStorage để vượt xác thực.

Nguồn: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#origin-validation

GoogleSignInButton hiển thị lý do trên origin không hỗ trợ, không tải SDK hoặc tạo nonce lặp ở đó. localhost/127.0.0.1/HTTPS tên miền tiếp tục flow GIS hiện có.

Guest được giữ bằng cookie trên cùng trình duyệt/host. Restart npm dev không chủ động xóa credential trong MySQL. IP/host khác hoặc vùng dữ liệu trình duyệt khác không cùng Guest. EntryGate phân biệt lỗi tải/mạng với 401: non401 hiện Thử lại, không đẩy người chơi sang tạo Guest. Chưa tái hiện trực tiếp mất cookie trên điện thoại của user.

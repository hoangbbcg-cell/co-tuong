// @vitest-environment jsdom
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react'
import {afterEach,beforeEach,expect,it,vi} from 'vitest'
import {VietnamAddressPicker} from '../src/features/lobby/components/VietnamAddressPicker'
vi.mock('../src/features/lobby/hooks/useVietnamAdministrativeUnits',()=>({useVietnamAdministrativeUnits:()=>({provinces:[{code:1,name:'Hà Nội',divisionType:'thành phố',wards:[]}],wards:[{code:101,name:'Phúc Xá',divisionType:'phường'}],provincesLoading:false,wardsLoading:false})}))
const show=Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype,'showModal'),close=Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype,'close')
beforeEach(()=>{vi.stubGlobal('matchMedia',vi.fn().mockReturnValue({matches:false}));Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value:function(this:HTMLDialogElement){this.open=true}});Object.defineProperty(HTMLDialogElement.prototype,'close',{configurable:true,value:function(this:HTMLDialogElement){this.open=false}})})
afterEach(()=>{cleanup();vi.unstubAllGlobals();if(show)Object.defineProperty(HTMLDialogElement.prototype,'showModal',show);else Reflect.deleteProperty(HTMLDialogElement.prototype,'showModal');if(close)Object.defineProperty(HTMLDialogElement.prototype,'close',close);else Reflect.deleteProperty(HTMLDialogElement.prototype,'close')})
function selectAddress(){fireEvent.click(screen.getByRole('button',{name:'Tiếp'}));fireEvent.click(screen.getByRole('button',{name:'Hà Nội'}));fireEvent.click(screen.getByRole('button',{name:'Tiếp'}));fireEvent.click(screen.getByRole('button',{name:'Phúc Xá'}));fireEvent.click(screen.getByRole('button',{name:'Lưu địa chỉ'}))}
it('offers Vietnam only and requires confirmation before saving the selected address',async()=>{
 const save=vi.fn();render(<VietnamAddressPicker onCancel={()=>{}} onSave={save}/>);
 expect(screen.queryByRole('combobox')).toBeNull();expect(screen.queryByRole('button',{name:/Thái Lan/})).toBeNull();expect(screen.getByRole('button',{name:/Việt Nam/}).getAttribute('aria-pressed')).toBe('true');
 selectAddress();expect(save).not.toHaveBeenCalled();fireEvent.click(screen.getByRole('button',{name:'Đồng ý'}));
 await waitFor(()=>expect(save).toHaveBeenCalledWith('Phúc Xá, Hà Nội','Hà Nội','VN','1','101','Phúc Xá'))
})
it('searches countries without accents and clears the search before choosing a province',()=>{
 render(<VietnamAddressPicker onCancel={()=>{}} onSave={vi.fn()}/>);fireEvent.change(screen.getByRole('searchbox',{name:'Tìm quốc gia'}),{target:{value:'viet nam'}});expect(screen.getByRole('button',{name:/Việt Nam/})).toBeTruthy();expect(screen.queryByRole('button',{name:/Thái Lan/})).toBeNull();fireEvent.click(screen.getByRole('button',{name:'Tiếp'}));expect((screen.getByRole('searchbox',{name:'Tìm tỉnh, thành phố, xã hoặc phường'}) as HTMLInputElement).value).toBe('')
})
it('shows the server save error and retries without losing the selected address',async()=>{
 const {AxiosError}=await import('axios');const failure=new AxiosError('Request failed');failure.response={data:{error:'Không xác minh được địa giới. Vui lòng thử lại.'},status:503,statusText:'',headers:{},config:{} as never};
 const save=vi.fn().mockRejectedValueOnce(failure).mockResolvedValueOnce(undefined);render(<VietnamAddressPicker onCancel={()=>{}} onSave={save}/>);selectAddress();fireEvent.click(screen.getByRole('button',{name:'Đồng ý'}));await waitFor(()=>expect(screen.getByRole('alert').textContent).toContain('Không xác minh được địa giới'));expect(screen.getByRole('button',{name:'Phúc Xá'}).getAttribute('aria-pressed')).toBe('true');fireEvent.click(screen.getByRole('button',{name:'Lưu địa chỉ'}));fireEvent.click(screen.getByRole('button',{name:'Đồng ý'}));await waitFor(()=>expect(save).toHaveBeenCalledTimes(2));expect(screen.queryByRole('alert')).toBeNull()
})

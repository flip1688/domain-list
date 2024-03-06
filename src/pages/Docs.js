import Header from "./Header"
import Sidebar from "./Sidebar"
import CreateUserBtn from '../images/createUser.png'
import EditUserBtn from '../images/editUser.png'
import FetchUserPic from '../images/fetchUser.png'
import CreateDomainBtn from '../images/createDomain.png'
import EditDomainBtn from '../images/editDomain.png'
import FetchDomainBtn from '../images/fetchDomain.png'
import CreatePaymentBtn from '../images/createPayment.png'
import EditPaymentBtn from '../images/editPayment.png'
import FetchPaymentBtn from '../images/fetchPayment.png'

const Docs = () => {


  return (
    <>
      <div className="container-fluid">
        <div className="row bg-body-tertiary">
          <Header />
        </div>
        <div className="row">
          <div className="d-none d-lg-block col-lg-2 bg-body-tertiary">
            <Sidebar />
          </div>
          <div className="col-12 col-lg-10">
            <div
              className="container"
            >
            <div className="row">
              <div className="col-12 text-left position-relative top-0 start-0">
                <h1 className="my-3">คู่มือการใช้งาน</h1>
                  <div className="row">
                    เนื้อหา
                    <ul>
                      <li>
                        <a href="#user">ผู้ใช้งาน</a>
                        <ul>
                          <li><a href="#create-user">สร้างผู้ใช้งาน</a></li>
                          <li><a href="#edit-user">แก้ไขผู้ใช้งาน</a></li>
                          <li><a href="#fetch-user">แสดงรายชื่อผู้ใช้งาน</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="#domain">รายชื่อเว็บ</a>
                        <ul>
                          <li><a href="#create-domain">สร้างรายการเว็บใหม่</a></li>
                          <li><a href="#edit-domain">แก้ไขราการเว็บ</a></li>
                          <li><a href="#fetch-domain">แสดงรายชื่อเว็บ</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="#payment">การชำระเงิน</a>
                        <ul>
                          <li><a href="#create-payment">สร้างรายการใหม่</a></li>
                          <li><a href="#edit-payment">แก้ไขราการชำระเงิน</a></li>
                          <li><a href="#fetch-payment">แสดงรายการชำระเงิน</a></li>
                        </ul>
                      </li>
                    </ul>
                  <b>สิทธิการใช้งานของแต่ละตำแหน่ง</b>
                  <table className="table table-striped-columns">
                    <thead>
                      <tr>
                        <th className="text-center">หมวดหมู่</th>
                        <th colSpan={3} className="text-center">ผู้ใช้งาน</th>
                        <th colSpan={3} className="text-center">รายชื่อเว็บ</th>
                        <th colSpan={3} className="text-center">การชำระเงิน</th>
                      </tr>
                      <tr>
                        <th className="text-center">ตำแหน่ง</th>
                        <th className="text-center">สร้าง</th>
                        <th className="text-center">แก้ไข</th>
                        <th className="text-center">เรียกดู</th>
                        <th className="text-center">สร้าง</th>
                        <th className="text-center">แก้ไข</th>
                        <th className="text-center">เรียกดู</th>
                        <th className="text-center">สร้าง</th>
                        <th className="text-center">แก้ไข</th>
                        <th className="text-center">เรียกดู</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-center">Admin</td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                      </tr>
                      <tr>
                        <td className="text-center">Jater</td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                      </tr>
                      <tr>
                        <td className="text-center">Boss</td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                      </tr>
                      <tr>
                        <td className="text-center">Team</td>
                        <td className="text-center"><b className="text-danger">✘</b></td>
                        <td className="text-center"><b>เฉพาะตัวเอง</b></td>
                        <td className="text-center"><b>เฉพาะตัวเอง</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b>เฉพาะตัวเองสร้าง</b></td>
                        <td className="text-center"><b>เฉพาะตัวเองสร้าง</b></td>
                        <td className="text-center"><b className="text-success-emphasis">✓</b></td>
                        <td className="text-center"><b>เฉพาะตัวเองสร้าง</b></td>
                        <td className="text-center"><b>เฉพาะตัวเองสร้าง</b></td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                <h2 className="my-3" id="user">ผู้ใช้งาน</h2>
                  <div className="row">
                    <h3 id="create-user">สร้างผู้ใช้งาน</h3>
                    <div className="row pl-4">
                      <ol >
                        <li className="ml-3">
                          กดที่ปุ่ม "สร้างผู้ใช้งาน" ที่มุมบนขวา<br/>
                          <img src={CreateUserBtn}/>
                        </li>
                        <li className="ml-3">
                          เลือกตำแหน่ง จะมีตำแหน่งทั้งหมดคือ Jater, Boss, Team
                        </li>
                        <li>
                          กรอก Username เป็นตัวเลข 3 หลักขึ้นไป
                        </li>
                        <li>
                          กรอกรหัสผ่านเป็นตัวอักษรภาษาอังกฤษหรือตัวเลข 6 ตัวขึ้นไป
                        </li>
                        <li>
                          ใส่ชื่อของผู้ใช้งานใหม่
                        </li>
                        <li>
                          กด Submit เพื่อสร้างผู้ใช้งานใหม่
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="row">
                    <h3 id="edit-user">แก้ไขผู้ใช้งาน</h3>
                    <div className="row pl-4">
                      <ol>
                       <li>
                        เลือกกดแก้ไขสถานะ หรือ แก้ไขรหัสผ่าน จากด้านขวาของรายชื่อผู้ใช้งาน <br/>
                        <img src={EditUserBtn} />
                       </li>
                       <li>
                        กรอกข้อมูลใหม่ที่ต้องการแก้ไข
                       </li>
                       <li>
                          กด Submit เพื่อบันทึกการแก้ไข
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="row">
                    <h3 id="fetch-user">แสดงรายชื่อผู้ใช้งาน</h3>
                    <div className="row pl-4">
                      <ol>
                        <li>
                          สามารถค้นหาตาม Username หรือสถานะ และ ตำแหน่งของผูใช้งาน จากหัวข้อด้านบนของตารางรายชื่อผู้ใช้งาน <br/>
                          <img src={FetchUserPic} />
                        </li>
                      </ol>
                    </div>
                  </div>
                <h2 className="my-3" id="domain">รายชื่อเว็บ</h2>
                  <div className="row">
                    <h3 id="create-domain">สร้างรายการเว็บใหม่</h3>
                    <div className="row pl-4">
                      <ol >
                        <li className="ml-3">
                          กดที่ปุ่ม "สร้างรายการเว็บใหม่" ที่มุมบนขวา<br/>
                          <img src={CreateDomainBtn}/>
                        </li>
                        <li className="ml-3">
                          กรอกชื่อเว็บ ตัวอย่าง example.com หรือ https://www.example.com
                        </li>
                        <li>
                          กรอกจำนวนเงิน
                        </li>
                        <li>
                          กรอกหมายเหตุ หรือเว้นว่าง
                        </li>
                        <li>
                          กด Submit เพื่อราการเว็บใหม่
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="row">
                    <h3 id="edit-domain">แก้ไขราการเว็บ</h3>
                    <div className="row pl-4">
                      <ol>
                       <li>
                        เลือกกดแก้ไขชื่อเว็บ, แก้ไขจำนวนเงิน, แก้ไขหมายเหตุ, แก้ไขสถานะ จากด้านขวาของรายการชื่อเว็บ <br/>
                        <img src={EditDomainBtn} />
                       </li>
                       <li>
                        กรอกข้อมูลใหม่ที่ต้องการแก้ไข
                       </li>
                       <li>
                          กด Submit เพื่อบันทึกการแก้ไข
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="row">
                    <h3 id="fetch-domain">แสดงรายชื่อเว็บ</h3>
                    <div className="row pl-4">
                      <ol>
                        <li>
                          สามารถค้นหาตาม ชื่อเว็บ หรือสถานะ จากหัวข้อด้านบนของตารางรายชื่อเว็บ <br/>
                          <img src={FetchDomainBtn} />
                        </li>
                      </ol>
                    </div>
                  </div>
                <h2 className="my-3" id="payment">การชำระเงิน</h2>
                <div className="row">
                    <h3 id="create-payment">สร้างรายการใหม่</h3>
                    <div className="row pl-4">
                      <ol >
                        <li className="ml-3">
                          กดที่ปุ่ม "สร้างรายการใหม่" ที่มุมบนขวา<br/>
                          <img src={CreatePaymentBtn}/>
                        </li>
                        <li>
                          ระบบเวลาของรายการชำระเงิน
                        </li>
                        <li className="ml-3">
                          กรอกชื่อเว็บ โดยค้นหาจากชื่อเว็บ
                        </li>
                        <li>
                          กรอกจำนวนเงิน
                        </li>
                        <li>
                          กรอกหมายเหตุ หรือเว้นว่าง
                        </li>
                        <li>
                          กด Submit เพื่อราการเว็บใหม่
                        </li>
                      </ol>
                    </div>
                  </div>
              </div>
              <div className="row">
                    <h3 id="edit-payment">แก้ไขราการชำระเงิน</h3>
                    <div className="row pl-4">
                      <ol>
                       <li>
                        เลือกแก้ไขเวลารายการ, แก้ไขจำนวนเงิน, แก้ไขหมายเหตุ, กดแก้ไขชื่อเว็บ จากด้านขวาของรายการชำระเงิน <br/>
                        <img src={EditPaymentBtn} />
                       </li>
                       <li>
                        กรอกข้อมูลใหม่ที่ต้องการแก้ไข
                       </li>
                       <li>
                          กด Submit เพื่อบันทึกการแก้ไข
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="row">
                    <h3 id="fetch-payment">แสดงรายการชำระเงิน</h3>
                    <div className="row pl-4">
                      <ol>
                        <li>
                          สามารถค้นหาตาม ชื่อเว็บ ชื่อของผู้สร้างรายการ หรือ ช่วงวันเวลาของรายการ จากหัวข้อด้านบนของตารางรายชื่อเว็บ <br/>
                          <img src={FetchPaymentBtn} />
                        </li>
                      </ol>
                    </div>
                  </div>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Docs;

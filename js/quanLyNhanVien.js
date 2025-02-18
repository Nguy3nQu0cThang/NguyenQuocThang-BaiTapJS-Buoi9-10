import { NhanVien } from "../Models/NhanVien.js";
import { calcTongLuong, xepLoai } from "./function.js";
let arrNhanVien = [];

document.querySelector("#formNhanVien").onsubmit = function (e) {
  e.preventDefault();
  console.log("submit");
  let nv = new NhanVien();
  let arrayInput = document.querySelectorAll("#formNhanVien .form-control");

  for (let input of arrayInput) {
    nv[input.id] = input.value;
  }
  nv.tongLuong = calcTongLuong(nv.chucvu, nv.luongCB);
  nv.loai=xepLoai(nv.gioLam)
  arrNhanVien.push(nv);
  console.log(arrNhanVien);
  renderTableNhanVien(arrNhanVien);
};

window.renderTableNhanVien = function renderTableNhanVien(arrNV) {
  let htmlString = "";
  for (let nv of arrNV) {
    htmlString += `
      <tr>
          <td>${nv.tknv}</td>
          <td>${nv.name}</td>
          <td>${nv.email}</td>
          <td>${nv.datepicker}</td>
          <td>${nv.chucvu}</td>
          <td>${nv.tongLuong}</td>
          <td>${nv.loai}</td>
          <td>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xóa</button>
        </td>
      </tr>
    `;
  }
  document.querySelector("#tableDanhSach").innerHTML = htmlString;
  saveLocalStorage();
};

window.xoaNhanVien = function (tknv) {
  console.log(tknv);
  let indexDel = arrNhanVien.findIndex((nv) => nv.tknv === tknv);
  if (indexDel != -1) {
    arrNhanVien.splice(indexDel, 1);
    console.log(arrNhanVien);
    renderTableNhanVien(arrNhanVien);
  }
};

document.getElementById("btnCapNhat").onclick = function () {
  let nvUpdate = new NhanVien();
  let arrayInput = document.querySelectorAll("#formNhanVien .form-control");
  for (let input of arrayInput) {
    nvUpdate[input.id] = input.value;
  }
  let indexUpdate = arrNhanVien.find((nv) => nv.tknv === nvUpdate.tknv);
  if (indexUpdate) {
    for (let key in indexUpdate) {
      indexUpdate[key] = nvUpdate[key];
    }
  }
  indexUpdate.tongLuong = calcTongLuong(nvUpdate.chucvu, nvUpdate.luongCB);
  indexUpdate.loai=xepLoai(nvUpdate.gioLam)
  console.log(arrNhanVien);
  renderTableNhanVien(arrNhanVien);

};

document.getElementById("btnTimNV").onclick=function(){
  let loaiNV=document.getElementById("searchName").value;
  let indexFilter=arrNhanVien.filter(nv=>nv.loai===loaiNV);
  renderTableNhanVien(indexFilter)
}
window.saveLocalStorage = function () {
  //biến đổi thành string []=> "[]" hoặc "{}"
  let strNhanVien = JSON.stringify(arrNhanVien);
  //Lưu vào storage
  localStorage.setItem("arrNhanVien", strNhanVien);
  console.log(strNhanVien);
};

window.loadLocalStorage = function () {
  if (localStorage.getItem("arrNhanVien")) {
    let strNhanVien = localStorage.getItem("arrNhanVien");
    arrNhanVien = JSON.parse(strNhanVien);
    renderTableNhanVien(arrNhanVien);
  }
};
loadLocalStorage();

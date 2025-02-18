export function calcTongLuong(pos, num) {
  let luong = 0;
  if (pos === "Sếp") luong = num * 3;
  if (pos === "Trưởng phòng") luong = num * 2;
  if (pos === "Nhân viên") luong = num;
  return luong;
}

export function xepLoai(hour) {
  let result = "";

  if (hour < 0) result = null;
  else {
    if (hour>0&&hour < 160) result = "trung bình";
    else {
      if (hour >= 160 && hour < 176) result = "khá";
      else {
        if (hour >= 176 && hour < 192) result = "giỏi";
        else {
          if (hour >= 192) result = "xuất sắc";
        }
      }
    }
  }
  return result;
}


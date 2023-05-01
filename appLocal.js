//!burada list adında, local de list adında boş bir list oluştur, listnin içi doluysa dolu listyi getir*************************
//todo *****************
let list = JSON.parse(localStorage.getItem("list")) || [];

const listInput = document.querySelector("#todo-input");
const listUl = document.querySelector("#todo-ul");
const listButon = document.querySelector("#todo-button");
const overall = document.querySelector("#overall");
let completed = 0;

//!Add butonuna basıldığında

listButon.onclick = () => {
  if (!listInput.value) {
    alert("please enter a note");
  } else if (list.includes(listInput.value)) {
    return;
  } else {
    list.push(listInput.value);

    //!list ye eleman eklenince  localStorage deki list yi güncelle**************************
    //todo *****************
    localStorage.setItem("list", JSON.stringify(list));

    // console.log(list);
    //!ekranda listyi göster

    showList();
    listInput.value = "";
  }
};
// console.log(list);
const showList = () => {
  //todo *****************
  listUl.textContent = "";
  // localstorage daki verileri ekrana baştan yazdır
  // başka türlü olmaz mesela girilenle aynısı todos ta yoksa yazdır desek, aynı şeyi girmek isteyebiliriz
  //todo *****************
  list.forEach((todo, i, array) => {
    listUl.innerHTML += `
    <li>
      <i class="fa fa-check fa-lg"> </i>
      <p>${todo}</p>
     

      <i class="fa fa-trash fa-lg"></i>
    </li>`;
  });
  //2.basma yolu
  //    <p>${array[array.length - 1]}</p>;
  //todo *****************
  overall.textContent = list.length;

  listInput.focus();

  //!silme
  createRemoveButton();
  //!check
  createCheckButon();
};

const createRemoveButton = () => {
  document.querySelectorAll(".fa-trash").forEach((a) => {
    a.onclick = () => {
      //  console.log(list.indexOf(
      //   a.previousElementSibling.textContent
      // ))
      //!  a.previousElementSibling=a nın önceki  kardeş elementi=p
      // console.log(
      //   a.previousElementSibling.textContent
      // )
      const deleteIndex = list.indexOf(
        a.previousElementSibling.textContent
      );

      list.splice(deleteIndex, 1);
      //!splice(değişecek index, silinecek mi-kaç tane silinecek, yerine ne gelecekse-opsiyonel)
      a.parentElement.remove();
      //!ekrandan silmezsek o an ekranda elemanlar durur, refresh yapınca localStorage den dizi geleceği için silinmiş olarak gelir, o yüzden ekrandan da silmekte fayda var
      //!listden eleman silinince localStorage deki list yi güncelle*************
      //todo *****************
      localStorage.setItem("list", JSON.stringify(list));

      //todo *****************
      overall.textContent = list.length;

      if (completed > 0 && a.parentElement.classList.contains("checked")) {
        completed = completed - 1;
        document.querySelector("#completed").textContent = completed;
      }
    };
  });
};

const createCheckButon = () => {
  //!1.yol
  document.querySelectorAll(".fa-check").forEach((a) => {
    a.onclick = () => {
      if (a.parentElement.classList.contains("checked")) {
        a.parentElement.classList.remove("checked");
        completed = completed - 1;
      } else {
        a.parentElement.classList.add("checked");
        completed = completed + 1;
      }
      document.querySelector("#completed").textContent = completed;
    };
  });
};

// ekran tekrar açıldığında kalıcı kaydettiğim elemanlar ekrana direk basılsın
showList();

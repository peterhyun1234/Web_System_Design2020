
function edit(id, name){
   let edit_name =  document.getElementById("edit_name");
   let edit_id = document.getElementById("edit_id");
   edit_name.value = name;
   edit_id.value = id;
}


function ajaxAdd(){
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("name");
    alert(name.value);
    var data = {
        'name' : name.value
    }

    xhr.onload = function(){
        if(xhr.status === 200 || xhr.status === 201){
            let response = JSON.parse(xhr.response);
            alert(response.name);
            let list = document.getElementById("personlist");
            let li = document.createElement("li");
            li.setAttribute("id", "person"+response.id);
            let node = document.createTextNode(response.name);
            li.appendChild(node);
            let input = document.createElement("input");
            input.setAttribute("type", "button");
            input.onclick = ()=>{ ajaxDelete(response.id)};
            input.value = "Delete By AJAX";

            let editInput = document.createElement("input");
            editInput.setAttribute("type", "button");

            editInput.onclick = ()=>{ edit(response.id, response.name)};
            editInput.value = "Call Edit";

            li.appendChild(input);
            li.appendChild(editInput);

            list.appendChild(li);

            alert("추가 성공!");
        }else {
            alert("추가 실패");
        }
    }

    xhr.open("POST", "/add");
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send(JSON.stringify(data));

}

function ajaxDelete(id){
    var xhr = new XMLHttpRequest();

    xhr.onload = function(){
        alert("삭제");
        if(xhr.status === 200 || xhr.status === 201){
            let deletedPerson = document.getElementById("person"+id);
            deletedPerson.remove();
            alert("삭제 성공!");
        }else {
            alert("삭제 실패");
        }
    }

    xhr.open("POST", "/delete/"+ id);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send();
}

function ajaxEdit(){
    var xhr = new XMLHttpRequest();
    let edit_name =  document.getElementById("edit_name");
    let edit_id = document.getElementById("edit_id");
    let data = {
        _id : edit_id.value,
        name : edit_name.value
    }

    xhr.onload = function(){
        alert("갱신");
        if(xhr.status === 200 || xhr.status === 201){
            let response = xhr.response;
            let person = response.person;
            console.log(person);
            let row = document.getElementById("person"+person._id);
            row.innerHTML = "";
            row.setAttribute("id", "person"+person._id);
            let node = document.createTextNode(edit_name.value);
            row.appendChild(node);
            let input = document.createElement("input");
            input.setAttribute("type", "button");
            input.onclick = ()=>{ ajaxDelete(person._id)};
            input.value = "Delete By AJAX";

            let editInput = document.createElement("input");
            editInput.setAttribute("type", "button");
            let name = edit_name.value;
            editInput.onclick = ()=>{ edit(person._id, name);};
            editInput.value = "Call Edit";

            row.appendChild(input);
            row.appendChild(editInput);

            alert("갱신 성공!");
        }else {
            alert("갱신 실패");
        }
    }

    xhr.open("POST", "/update/"+ edit_id.value);
    xhr.responseType = 'json';
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send(JSON.stringify(data));
}


function ajaxFindByName(){
    //XMLHttpRequest 객체 생성
    var xhr = new XMLHttpRequest();
    var name = document.getElementById("name");

    //백엔드 측으로 전달할 입력데이터 생성
    var data = {
        'name' : name.value
    }

    //요청의 상태가 DONE일 경우 프론트엔드 측에서 요청을 처리하는 방식을 정의 
    xhr.onload = function(){
        alert("검색");
        if(xhr.status === 200 || xhr.status === 201){
            //string으로 받은 Json 타입의 데이터를 JSON 객체화
            let response = JSON.parse(xhr.response);
            document.getElementById("personlist").innerHTML = ""
            // response JSON 타입 객체 내 people 데이터에 접근
            let people = response.people;
            console.log(response)

            //if문 안의 코드는 받은 데이터를 통해 리스트를 다시 구성하는 코드임. 
            if(people.length > 0){
                let ctr = 0;
                console.log(people)
                let list = document.getElementById("personlist");
                people.forEach((element)=>{
                    console.log(people)
                    ctr++;

                    let li = document.createElement("li");
                    li.setAttribute("id", "person"+element._id);
                    let node = document.createTextNode(element.name);
                    li.appendChild(node);
                    let input = document.createElement("input");
                    input.setAttribute("type", "button");
                    input.onclick = ()=>{ ajaxDelete(element._id)};
                    input.value = "Delete By AJAX";

                    let editInput = document.createElement("input");
                    editInput.setAttribute("type", "button");
                    editInput.onclick = ()=>{ edit(element._id, element.name)};
                    editInput.value = "Call Edit";

                    li.appendChild(input);
                    li.appendChild(editInput);
                    list.appendChild(li);

                    if(ctr === people.length){
                        alert("검색 성공!");

                    }
                });
            }

        }else {
            alert("검색 실패");
        }
    }

    //생성된 XmlHttpRequest 객체의 초기화 
    xhr.open("POST", "/searchrequest");
    //요청의 헤더 설정(json 타입을 통신에 활용할 것이므로, 컨텐츠 타입을 json으로 선언)
    xhr.setRequestHeader("Content-Type", 'application/json');
    //서버측으로 전달할 json 타입의 데이터를 string화 한 데이터와 함께 요청을 전달.   
    xhr.send(JSON.stringify(data));
}


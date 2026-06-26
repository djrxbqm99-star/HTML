document.addEventListener('DOMContentLoaded', function(){
    const todoList  = document.getElementById('todoList');
    const inputTodo = document.getElementById('inputTodo');
    const btnAdd    = document.getElementById('btnAdd');

    // 데이터 등록 (추가 버튼 클릭 시)
    btnAdd.addEventListener('click', function(){

        const todoValue = inputTodo.value;

        if(todoValue === ""){
            alert('할 일을 입력하세요.');
            return;
        }

        /* -----------------------------------------
         * [박스 1] 여기에 데이터 등록 코드가 들어가야 합니다.
         * ----------------------------------------- */
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');

        li.textContent = todoValue;
        deleteBtn.textContent = '×';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(deleteBtn);
        todoList.prepend(li); // 최신 글이 맨 위로 추가됨

        inputTodo.value = ""; 
        saveData();           
    });

    // 입력창에서 엔터 키를 눌렀을 때도 추가 버튼 클릭 기능 실행
    inputTodo.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            btnAdd.click(); // 추가 버튼을 마우스로 클릭한 것과 동일한 효과
        }
    });

    /* ---------------------------------------------
     * [박스 2] 여기에 데이터 삭제 코드 작성
     * --------------------------------------------- */
    todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove(); 
            saveData();                      
        }
    });

    /* ---------------------------------------------
     * [박스 3] 여기에 데이터 저장 코드 작성, 브라우저 새로고침시 추가한 데이터 사라지지 않게 유지
     * --------------------------------------------- */
    function saveData() {
        const listItems = todoList.querySelectorAll('li');
        const todoArray = [];
        
        listItems.forEach(function(li) {
            const text = li.textContent.replace('×', '').trim();
            todoArray.push(text);
        });
        
        localStorage.setItem('savedTodos', JSON.stringify(todoArray));
    }

    const loadData = localStorage.getItem('savedTodos');
    if (loadData) {
        const todoArray = JSON.parse(loadData);
        
        for (let i = todoArray.length - 1; i >= 0; i--) {
            const li = document.createElement('li');
            const deleteBtn = document.createElement('button');

            li.textContent = todoArray[i];
            deleteBtn.textContent = '×';
            deleteBtn.classList.add('delete-btn');

            li.appendChild(deleteBtn);
            todoList.prepend(li);
        }
    }
});
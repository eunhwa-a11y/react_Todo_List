import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Todo = ({data, checkUpdate, deleteTodo, updateTodo}) => {

  const [mode, setMode] = useState('read');
  const [isChecked, setIsChecked] = useState(false); // 체크를 할 때마다 false, ture를 바꿔 줌
  const [text, setText] = useState(data.text);

  let className = '';
  let formClass = 'visually-hidden';

  const handleCheckboxClick = (e) => {
    let value = !isChecked;
    setIsChecked(value);
    checkUpdate(data.id, value) // 1, false or ture
  }

  if(isChecked){
    className = 'checked';
  }

  if(mode === 'edit'){
    className += ' visually-hidden';
    formClass = '';
  }

  let todoDelete = () => {
    deleteTodo(data.id);
  }

  let changeMode = () => {
    setMode('edit');
  }

  let changeText = (value) => {
    setText(value);
  }

  let todoUpdate = () => {
    updateTodo(data.id, text);
    setMode('read');
  }

  let cancelEdit = () => {
    setText(data.text);
    setMode('read');
  }

  return(
    <div>
      <Form.Check type="checkbox" className="d-flex gap-1" id={data.id}>

        <Form.Check.Input type="checkbox" onClick={handleCheckboxClick} />
        <Form.Check.Label className={className}>{text}</Form.Check.Label>
        {/* updateTodo는 사용자가 입력한 내용이 넘어가야 함, 기존 목록 수정*/}
        <Form className="d-flex gap-1 mb-1" onSubmit={todoUpdate}>
          <Form.Group className={formClass}>
            <Form.Control type="text" value={text} onChange={(e) => {
              changeText(e.target.value);
            }} />
          </Form.Group>
          <Button className={formClass} type="submit" variant="primary" size="sm" onClick={changeMode}>입력</Button>
          <Button className={formClass} type="button" variant="danger" size="sm" onClick={cancelEdit}>취소</Button>
        </Form>
        <Button variant="secondary" size="sm" onClick={changeMode}>수정</Button>
        <Button variant="danger" size="sm" onClick={todoDelete}>삭제</Button>

      </Form.Check>
    </div>
  )
}

export default Todo;
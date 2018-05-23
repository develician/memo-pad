import React from 'react';
import styles from './MemoList.scss';
import classNames from 'classnames/bind';
import MemoItem from 'components/memo/MemoItem';

const cx = classNames.bind(styles);

const MemoList = ({list, onClickUpdate, isUpdate, willUpdateId, oldContent, onChangeContent}) => {
  if(list.size === 0) return null;

  const makeUpdateMode = ({id, content}) => {
    onClickUpdate({id, content});
  }

  const handleChange = ({content}) => {
    onChangeContent({content});
  }

  const memoList = list.map(
    (memo, i) => {
      return (
        <MemoItem 
          key={memo._id}
          id={memo._id}
          content={memo.content}
          createdAt={memo.createdAt}
          updated={memo.updated}
          updatedAt={memo.updatedAt}
          onClickUpdate={makeUpdateMode}
          isUpdate={isUpdate && memo._id === willUpdateId}
          oldContent={oldContent}
          onChange={handleChange}/>
      )
    }
  );

  return (
    <div className={cx('MemoList')}>
      {
        memoList
      }
    </div>
  );
}

export default MemoList;
import { useState } from 'react';
import classes from './MiniCardWorker.module.css';

import WorkerCardModalWindow from "../WorkerCardModalWindow/WorkerCardModalWindow";
import SwiperTest from '../SwiperTest/SwiperTest';

// import { useState } from 'react';
// import { Link, animateScroll as scroll } from "react-scroll";

export default function MiniCardWorker({
  name, id, portfolio, avatar, comp, email,
}) {
  const [modal, setModal] = useState({
    show: false,
  });

  console.log('avatar ====>', avatar);

  function showModalHandler() {
    setModal((prev) => ({ ...prev, show: true, id }))
  }
  return (
    <div className={classes.card}>
      <div className={classes.headerCard}>
        <div className={classes.profile}>
          <img
            className={classes.profilePhoto}
            alt="Generic placeholder"
            src={`${process.env.REACT_APP_API_URL}${avatar && avatar.slice(-1)[0]}`}
          />
          <h1 className={classes.header}>{name}</h1>
        </div>
        <div className={classes.data}>
          <div className={classes.column}>
            <h3 className={classes.hint}>{email}</h3>
            <h2 className={classes.stat}>email</h2>
          </div>

          <div className={classes.column}>
            <h3 className={classes.hint}>ID:</h3>
            <h2 className={classes.stat}>{id}</h2>
          </div>
        </div>

      </div>
      <div className={classes.headerContainer}>
        <div className={classes.slider}>
          <h3 className={classes.hint}>Портфолио</h3>
          <SwiperTest id={id} imgs={portfolio} />
          {comp?.map((item, index) => (
            <SwiperTest imgs={item?.portfolio} key={index}></SwiperTest>
          ))}
        </div>

      </div>

      <div className={classes.footerCard}>
        <div className={classes.footerData}>
          <div className={classes.column}>
            <h3 className={classes.hint}>Опыт работы</h3>
            <div className={classes.dataTag}>
              <h2>3 года</h2>
            </div>
          </div>
          <div className={classes.column}>
            <h3 className={classes.hint}>Кол-во проектов</h3>
            <div className={classes.dataTag}>
              <h2>32 проекта</h2>
            </div>
          </div>
        </div>
        <button onClick={showModalHandler} className={classes.btnShowMore}>
          <svg className={classes.btnIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7.16666C8.27613 7.16666 8.5 7.39052 8.5 7.66666V11C8.5 11.2761 8.27613 11.5 8 11.5C7.72387 11.5 7.5 11.2761 7.5 11V7.66666C7.5 7.39052 7.72387 7.16666 8 7.16666Z" fill="#232323" />
            <path d="M7.99999 6.00002C8.36819 6.00002 8.66666 5.70154 8.66666 5.33335C8.66666 4.96516 8.36819 4.66669 7.99999 4.66669C7.63179 4.66669 7.33333 4.96516 7.33333 5.33335C7.33333 5.70154 7.63179 6.00002 7.99999 6.00002Z" fill="#232323" />
            <path fillRule="evenodd" clipRule="evenodd" d="M4.87782 2.51251C6.9362 2.28245 9.0638 2.28245 11.1221 2.51251C12.3397 2.64859 13.323 3.60769 13.4663 4.83233C13.7124 6.93693 13.7124 9.06307 13.4663 11.1677C13.323 12.3923 12.3397 13.3514 11.1221 13.4875C9.0638 13.7175 6.9362 13.7175 4.87782 13.4875C3.66024 13.3514 2.67697 12.3923 2.53374 11.1677C2.28758 9.06307 2.28758 6.93693 2.53374 4.83233C2.67697 3.60769 3.66024 2.64859 4.87782 2.51251ZM11.0111 3.50632C9.02654 3.28451 6.97347 3.28451 4.9889 3.50632C4.22594 3.59159 3.61524 4.19375 3.52697 4.94849C3.28984 6.97593 3.28984 9.02407 3.52697 11.0515C3.61524 11.8063 4.22594 12.4084 4.9889 12.4937C6.97347 12.7155 9.02654 12.7155 11.0111 12.4937C11.7741 12.4084 12.3847 11.8063 12.473 11.0515C12.7101 9.02407 12.7101 6.97593 12.473 4.94849C12.3847 4.19375 11.7741 3.59159 11.0111 3.50632Z" fill="#232323" />
          </svg>
          Подробнее
        </button>
      </div>
      <div style={{ position: 'relative' }}>
        {
          modal.show && <WorkerCardModalWindow imgs={portfolio} name={name} setModal={setModal} id={id} />
        }
      </div>

    </div>
  )
}

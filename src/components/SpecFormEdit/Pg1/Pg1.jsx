import axios from 'axios'
import React, {
  useContext, useEffect, useLayoutEffect, useRef, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SliderValue from '../../SliderValue/SliderValue'
import classes from '../SpecFormEdit.module.css'
import { useTranslation } from 'react-i18next'
import { setCompany } from '../../../store/actions/auth.action'
import SwiperTest from '../../SwiperTest/SwiperTest'
import FormContext from '../../FormContext/form.context'
import { getCompany } from '../../../store/actions/workers.action'
import { motion } from 'framer-motion';

export default function Pg1({ comp }) {
  const { auth: { id } } = useSelector((state) => state);
  const {
    saver,
    setSaver,
  } = useContext(FormContext);
  // console.log('цена ===>', comp.filter(el => el.work_type_id === 11).slice(-1)[0].cost);
  const [img, setImg] = useState(null);
  const [value, setValue] = useState(6)
  const [terms, setTerms] = useState('1-3');
  const [policy, setPolicy] = useState("project");
  const [prog, setProg] = useState([]);
  const [skill, setSkill] = useState([]);
  const [response, setResponse] = useState(null);
  const [upload, setUpload] = useState(null);
  const [compm, setCompm] = useState([]);
  const [pics, setPics] = useState(compm[0]?.portfolio);
  const [done, setDone] = useState(false);
  const [picload, setPicload] = useState(false);

  const dispatch = useDispatch();

  const updPic = async (event) => {
    try {
      const arr = Array.from(event.target.files)
      setImg(arr)
      console.log('arr', arr);
      console.log('img ===>', img);
      setPicload(true)
      for (let i = 0; i < arr.length; i++) {
        const formData = new FormData();
        formData.append('files', arr[i]);
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/files/?code=portfolio&company_id=${compm[0].id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        console.log(result.data);
        console.log('загружена', i);
      }
      dispatch(getCompany())
      // window.location.reload(true)
    } catch (error) {
      console.log(error);
    }
  }

  const { t, i18n } = useTranslation();
  const myRef = useRef(null)
  useEffect(() => {
    localStorage.setItem('spec', JSON.stringify('pg1'))

    const lng = navigator.language;
    function getObjectKeys(obj) {
      return Object.keys(obj);
    }
    const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/companies/my/`)

      setValue(result.data.filter(el => el.work_type_id === 11).slice(-1)[0].cost)
      setPolicy(result.data.filter(el => el.work_type_id === 11).slice(-1)[0].price_policy)
      setTerms(getObjectKeys(result.data.filter(el => el.work_type_id === 11).slice(-1)[0].checkboxes).filter(el => el === '1-3' || el === '3-6' || el === '6-12' || el === 'more')[0])
      // setProg(getObjectKeys(result.data.filter(el => el.work_type_id === 11).slice(-1)[0].checkboxes))
      setSkill(getObjectKeys(result.data.filter(el => el.work_type_id === 11).slice(-1)[0].checkboxes))
      setPics(result.data.filter(el => el.work_type_id === 11).slice(-1)[0]?.portfolio)
      setPicload(false)
      setDone(true)
      return result
    }
    fetchData()
  }, [comp])

  useEffect(() => {
    console.log('%c как выглядит comp =====>', "color:blue", comp);
    console.log('%c стейт comp =====>', "color:blue", compm);
    const newArr = []
    for (let i = 0; i < comp.length; i++) {
      if (comp[i].work_type_id === 11) {
        newArr.push(comp[i])
        console.log('%cnewArr =====>', "color:green", newArr);
      }
      setCompm(newArr)
      console.log('%c вот что в стейте после добавления =====>', "color:red", compm);
    }

    console.log('%c мои компании для отображения ==>', "color:pink", compm);
  }, [comp])

  const lng = navigator.language;

  const loader = {
    hidden: {
      y: 50,
    },
    visible: {
      y: 0,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.4,
        ease: "easeInOut",
        type: "spring",
      },
    },
  }

  console.log('terms ===>', terms);
  console.log('value ===>', value);
  console.log('prog ===>>', prog);
  console.log('policy ===>>', policy);
  console.log('skill ===>>>>>>', skill);
  console.log('img ===>>>>>>', img);
  console.log('compm ===>>>>>>', compm);
  const Page = {
    hidden: {
      y: 50,
      opacity: 0,

    },
    visible: custom => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: custom * 0.2,
        ease: "easeInOut",
        type: "spring",
      },

    }),
  }
  return (
    <div className={classes.pageWrapper}>
      {done && (
        <>
          <motion.div
            initial='hidden'
            whileInView='visible'
            variants={Page}
            className={classes.pageWrapper}
          >
            {pics?.length > 0 && <SwiperTest picload={picload} id={compm[0].id} imgs={pics} setImgs={setPics} />}
            <div className={classes.btnWrapper}>
              <label className={`${classes.ic_btn} ${classes.ic_btn_green}`} htmlFor="formFileMultipleNew">Добавить ещё</label>
            </div>
            <input multiple accept="image/*" style={{ visibility: 'hidden' }} className='hidden' type="file" id="formFileMultipleNew" onChange={updPic} />
          </motion.div>
        </>
      )}
      {/* {picload && (
        <div
          className={classes.loaderWrapper}
        >
          <div className={classes.rockWrapper}>
            <motion.img
              variants={loader}
              initial='hidden'
              whileInView='visible'
              src="/images/hands_icon/Rock.webp"
              alt="loader"
            />
            <motion.img
              variants={loader}
              initial='hidden'
              whileInView='visible'
              src="/images/hands_icon/Rock.webp"
              alt="loader"
            />
          </div>
          <div className={classes.loaderText}>
            <p>Загружаем работы...</p>
            <p>Оцениваем ИИ...</p>
          </div>
        </div>
      )} */}

    </div>

  )
}
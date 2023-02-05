import { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import SetPin from "../../components/SetPin/SetPin.js";
import EnterPin from "../../components/EnterPin/EnterPin";
import { checkStatus } from "../../api/pin";
import styles from "./Home.module.css";
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';


export default function Home() {
    const [setting, setSetting] = useState(localStorage.getItem("setting") || false);
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("loggedIn")));
    const [locked, setLocked] = useState(JSON.parse(localStorage.getItem("locked")));
    const [currFolder, setCurrFolder] = useState("");
    console.log(currFolder);

    if (!setting && !loggedIn) {
            checkLog();
            console.log("reached");
        }
    async function checkLog() {
        const result = await checkStatus();

        if (typeof (result) === "undefined") {
            localStorage.setItem("loggedIn", "false");
            setLoggedIn(false);
        }
        else {
            localStorage.setItem("loggedIn", "true");
            setLoggedIn(true);
        }
    }
    function handleSettings() {
        setSetting(true);
        localStorage.setItem("setting", "true");
        localStorage.removeItem("loggedIn");
        localStorage.setItem("loggedIn", "false");
        setLoggedIn(false);
    }

    function handleLogout() {
        setLocked(true);
        localStorage.removeItem("locked");
        localStorage.setItem("locked", "true");
    }




    return (
        <div className={styles.container}>
            <button className={styles.settings} onClick={handleSettings}><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 25C23.6569 25 25 23.6569 25 22C25 20.3431 23.6569 19 22 19C20.3431 19 19 20.3431 19 22C19 23.6569 20.3431 25 22 25Z" stroke="#566474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M29.4 25C29.2669 25.3016 29.2272 25.6362 29.286 25.9606C29.3448 26.285 29.4995 26.5843 29.73 26.82L29.79 26.88C29.976 27.0657 30.1235 27.2863 30.2241 27.5291C30.3248 27.7719 30.3766 28.0322 30.3766 28.295C30.3766 28.5578 30.3248 28.8181 30.2241 29.0609C30.1235 29.3037 29.976 29.5243 29.79 29.71C29.6043 29.896 29.3837 30.0435 29.1409 30.1441C28.8981 30.2448 28.6378 30.2966 28.375 30.2966C28.1122 30.2966 27.8519 30.2448 27.6091 30.1441C27.3663 30.0435 27.1457 29.896 26.96 29.71L26.9 29.65C26.6643 29.4195 26.365 29.2648 26.0406 29.206C25.7162 29.1472 25.3816 29.1869 25.08 29.32C24.7842 29.4468 24.532 29.6572 24.3543 29.9255C24.1766 30.1938 24.0813 30.5082 24.08 30.83V31C24.08 31.5304 23.8693 32.0391 23.4942 32.4142C23.1191 32.7893 22.6104 33 22.08 33C21.5496 33 21.0409 32.7893 20.6658 32.4142C20.2907 32.0391 20.08 31.5304 20.08 31V30.91C20.0723 30.579 19.9651 30.258 19.7725 29.9887C19.5799 29.7194 19.3107 29.5143 19 29.4C18.6984 29.2669 18.3638 29.2272 18.0394 29.286C17.715 29.3448 17.4157 29.4995 17.18 29.73L17.12 29.79C16.9343 29.976 16.7137 30.1235 16.4709 30.2241C16.2281 30.3248 15.9678 30.3766 15.705 30.3766C15.4422 30.3766 15.1819 30.3248 14.9391 30.2241C14.6963 30.1235 14.4757 29.976 14.29 29.79C14.104 29.6043 13.9565 29.3837 13.8559 29.1409C13.7552 28.8981 13.7034 28.6378 13.7034 28.375C13.7034 28.1122 13.7552 27.8519 13.8559 27.6091C13.9565 27.3663 14.104 27.1457 14.29 26.96L14.35 26.9C14.5805 26.6643 14.7352 26.365 14.794 26.0406C14.8528 25.7162 14.8131 25.3816 14.68 25.08C14.5532 24.7842 14.3428 24.532 14.0745 24.3543C13.8062 24.1766 13.4918 24.0813 13.17 24.08H13C12.4696 24.08 11.9609 23.8693 11.5858 23.4942C11.2107 23.1191 11 22.6104 11 22.08C11 21.5496 11.2107 21.0409 11.5858 20.6658C11.9609 20.2907 12.4696 20.08 13 20.08H13.09C13.421 20.0723 13.742 19.9651 14.0113 19.7725C14.2806 19.5799 14.4857 19.3107 14.6 19C14.7331 18.6984 14.7728 18.3638 14.714 18.0394C14.6552 17.715 14.5005 17.4157 14.27 17.18L14.21 17.12C14.024 16.9343 13.8765 16.7137 13.7759 16.4709C13.6752 16.2281 13.6234 15.9678 13.6234 15.705C13.6234 15.4422 13.6752 15.1819 13.7759 14.9391C13.8765 14.6963 14.024 14.4757 14.21 14.29C14.3957 14.104 14.6163 13.9565 14.8591 13.8559C15.1019 13.7552 15.3622 13.7034 15.625 13.7034C15.8878 13.7034 16.1481 13.7552 16.3909 13.8559C16.6337 13.9565 16.8543 14.104 17.04 14.29L17.1 14.35C17.3357 14.5805 17.635 14.7352 17.9594 14.794C18.2838 14.8528 18.6184 14.8131 18.92 14.68H19C19.2958 14.5532 19.548 14.3428 19.7257 14.0745C19.9034 13.8062 19.9987 13.4918 20 13.17V13C20 12.4696 20.2107 11.9609 20.5858 11.5858C20.9609 11.2107 21.4696 11 22 11C22.5304 11 23.0391 11.2107 23.4142 11.5858C23.7893 11.9609 24 12.4696 24 13V13.09C24.0013 13.4118 24.0966 13.7262 24.2743 13.9945C24.452 14.2628 24.7042 14.4732 25 14.6C25.3016 14.7331 25.6362 14.7728 25.9606 14.714C26.285 14.6552 26.5843 14.5005 26.82 14.27L26.88 14.21C27.0657 14.024 27.2863 13.8765 27.5291 13.7759C27.7719 13.6752 28.0322 13.6234 28.295 13.6234C28.5578 13.6234 28.8181 13.6752 29.0609 13.7759C29.3037 13.8765 29.5243 14.024 29.71 14.21C29.896 14.3957 30.0435 14.6163 30.1441 14.8591C30.2448 15.1019 30.2966 15.3622 30.2966 15.625C30.2966 15.8878 30.2448 16.1481 30.1441 16.3909C30.0435 16.6337 29.896 16.8543 29.71 17.04L29.65 17.1C29.4195 17.3357 29.2648 17.635 29.206 17.9594C29.1472 18.2838 29.1869 18.6184 29.32 18.92V19C29.4468 19.2958 29.6572 19.548 29.9255 19.7257C30.1938 19.9034 30.5082 19.9987 30.83 20H31C31.5304 20 32.0391 20.2107 32.4142 20.5858C32.7893 20.9609 33 21.4696 33 22C33 22.5304 32.7893 23.0391 32.4142 23.4142C32.0391 23.7893 31.5304 24 31 24H30.91C30.5882 24.0013 30.2738 24.0966 30.0055 24.2743C29.7372 24.452 29.5268 24.7042 29.4 25V25Z" stroke="#566474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="0.5" y="0.5" width="43" height="43" rx="4.5" stroke="#EBF0F5" />
                <path d="M22 25C23.6569 25 25 23.6569 25 22C25 20.3431 23.6569 19 22 19C20.3431 19 19 20.3431 19 22C19 23.6569 20.3431 25 22 25Z" stroke="#566474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M29.4 25C29.2669 25.3016 29.2272 25.6362 29.286 25.9606C29.3448 26.285 29.4995 26.5843 29.73 26.82L29.79 26.88C29.976 27.0657 30.1235 27.2863 30.2241 27.5291C30.3248 27.7719 30.3766 28.0322 30.3766 28.295C30.3766 28.5578 30.3248 28.8181 30.2241 29.0609C30.1235 29.3037 29.976 29.5243 29.79 29.71C29.6043 29.896 29.3837 30.0435 29.1409 30.1441C28.8981 30.2448 28.6378 30.2966 28.375 30.2966C28.1122 30.2966 27.8519 30.2448 27.6091 30.1441C27.3663 30.0435 27.1457 29.896 26.96 29.71L26.9 29.65C26.6643 29.4195 26.365 29.2648 26.0406 29.206C25.7162 29.1472 25.3816 29.1869 25.08 29.32C24.7842 29.4468 24.532 29.6572 24.3543 29.9255C24.1766 30.1938 24.0813 30.5082 24.08 30.83V31C24.08 31.5304 23.8693 32.0391 23.4942 32.4142C23.1191 32.7893 22.6104 33 22.08 33C21.5496 33 21.0409 32.7893 20.6658 32.4142C20.2907 32.0391 20.08 31.5304 20.08 31V30.91C20.0723 30.579 19.9651 30.258 19.7725 29.9887C19.5799 29.7194 19.3107 29.5143 19 29.4C18.6984 29.2669 18.3638 29.2272 18.0394 29.286C17.715 29.3448 17.4157 29.4995 17.18 29.73L17.12 29.79C16.9343 29.976 16.7137 30.1235 16.4709 30.2241C16.2281 30.3248 15.9678 30.3766 15.705 30.3766C15.4422 30.3766 15.1819 30.3248 14.9391 30.2241C14.6963 30.1235 14.4757 29.976 14.29 29.79C14.104 29.6043 13.9565 29.3837 13.8559 29.1409C13.7552 28.8981 13.7034 28.6378 13.7034 28.375C13.7034 28.1122 13.7552 27.8519 13.8559 27.6091C13.9565 27.3663 14.104 27.1457 14.29 26.96L14.35 26.9C14.5805 26.6643 14.7352 26.365 14.794 26.0406C14.8528 25.7162 14.8131 25.3816 14.68 25.08C14.5532 24.7842 14.3428 24.532 14.0745 24.3543C13.8062 24.1766 13.4918 24.0813 13.17 24.08H13C12.4696 24.08 11.9609 23.8693 11.5858 23.4942C11.2107 23.1191 11 22.6104 11 22.08C11 21.5496 11.2107 21.0409 11.5858 20.6658C11.9609 20.2907 12.4696 20.08 13 20.08H13.09C13.421 20.0723 13.742 19.9651 14.0113 19.7725C14.2806 19.5799 14.4857 19.3107 14.6 19C14.7331 18.6984 14.7728 18.3638 14.714 18.0394C14.6552 17.715 14.5005 17.4157 14.27 17.18L14.21 17.12C14.024 16.9343 13.8765 16.7137 13.7759 16.4709C13.6752 16.2281 13.6234 15.9678 13.6234 15.705C13.6234 15.4422 13.6752 15.1819 13.7759 14.9391C13.8765 14.6963 14.024 14.4757 14.21 14.29C14.3957 14.104 14.6163 13.9565 14.8591 13.8559C15.1019 13.7552 15.3622 13.7034 15.625 13.7034C15.8878 13.7034 16.1481 13.7552 16.3909 13.8559C16.6337 13.9565 16.8543 14.104 17.04 14.29L17.1 14.35C17.3357 14.5805 17.635 14.7352 17.9594 14.794C18.2838 14.8528 18.6184 14.8131 18.92 14.68H19C19.2958 14.5532 19.548 14.3428 19.7257 14.0745C19.9034 13.8062 19.9987 13.4918 20 13.17V13C20 12.4696 20.2107 11.9609 20.5858 11.5858C20.9609 11.2107 21.4696 11 22 11C22.5304 11 23.0391 11.2107 23.4142 11.5858C23.7893 11.9609 24 12.4696 24 13V13.09C24.0013 13.4118 24.0966 13.7262 24.2743 13.9945C24.452 14.2628 24.7042 14.4732 25 14.6C25.3016 14.7331 25.6362 14.7728 25.9606 14.714C26.285 14.6552 26.5843 14.5005 26.82 14.27L26.88 14.21C27.0657 14.024 27.2863 13.8765 27.5291 13.7759C27.7719 13.6752 28.0322 13.6234 28.295 13.6234C28.5578 13.6234 28.8181 13.6752 29.0609 13.7759C29.3037 13.8765 29.5243 14.024 29.71 14.21C29.896 14.3957 30.0435 14.6163 30.1441 14.8591C30.2448 15.1019 30.2966 15.3622 30.2966 15.625C30.2966 15.8878 30.2448 16.1481 30.1441 16.3909C30.0435 16.6337 29.896 16.8543 29.71 17.04L29.65 17.1C29.4195 17.3357 29.2648 17.635 29.206 17.9594C29.1472 18.2838 29.1869 18.6184 29.32 18.92V19C29.4468 19.2958 29.6572 19.548 29.9255 19.7257C30.1938 19.9034 30.5082 19.9987 30.83 20H31C31.5304 20 32.0391 20.2107 32.4142 20.5858C32.7893 20.9609 33 21.4696 33 22C33 22.5304 32.7893 23.0391 32.4142 23.4142C32.0391 23.7893 31.5304 24 31 24H30.91C30.5882 24.0013 30.2738 24.0966 30.0055 24.2743C29.7372 24.452 29.5268 24.7042 29.4 25V25Z" stroke="#566474" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <rect x="0.5" y="0.5" width="43" height="43" rx="4.5" stroke="#EBF0F5" />
            </svg></button>

            <button className={styles.logout} onClick={handleLogout} ><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="43" height="43" rx="4.5" stroke="#EBF0F5" />
                <mask id="path-2-inside-1_0_3" fill="white">
                    <path d="M14 22C14 22.2761 14.2239 22.5 14.5 22.5H23.293L20.6465 25.1465C20.5527 25.2402 20.5001 25.3674 20.5001 25.4999C20.5 25.7761 20.7239 25.9999 21 26C21.1326 26.0001 21.2598 25.9474 21.3535 25.8535L24.8535 22.3535C24.8534 22.3536 24.8535 22.3535 24.8535 22.3535C25.0486 22.1583 25.0487 21.8417 24.8535 21.6465L21.3535 18.1465C21.1597 17.9594 20.8525 17.9594 20.6588 18.1465C20.4601 18.3384 20.4547 18.6549 20.6465 18.8535L23.293 21.5H14.5C14.2239 21.5 14 21.7239 14 22ZM27.5 12H16.5C15.1198 12.0013 14.0013 13.1198 14 14.5V18.5C14 18.7761 14.2239 19 14.5 19C14.7761 19 15 18.7761 15 18.5V14.5C15.0009 13.6719 15.6719 13.0009 16.5 13H27.5C28.3281 13.0009 28.9991 13.6719 29 14.5V29.5C28.9991 30.3281 28.3281 30.9991 27.5 31H16.5C15.6719 30.9991 15.0009 30.3281 15 29.5V25.5C15 25.2239 14.7761 25 14.5 25C14.2239 25 14 25.2239 14 25.5V29.5C14.0013 30.8802 15.1198 31.9987 16.5 32H27.5C28.8802 31.9987 29.9987 30.8802 30 29.5V14.5C29.9987 13.1198 28.8802 12.0013 27.5 12Z" />
                </mask>
                <path d="M14 22C14 22.2761 14.2239 22.5 14.5 22.5H23.293L20.6465 25.1465C20.5527 25.2402 20.5001 25.3674 20.5001 25.4999C20.5 25.7761 20.7239 25.9999 21 26C21.1326 26.0001 21.2598 25.9474 21.3535 25.8535L24.8535 22.3535C24.8534 22.3536 24.8535 22.3535 24.8535 22.3535C25.0486 22.1583 25.0487 21.8417 24.8535 21.6465L21.3535 18.1465C21.1597 17.9594 20.8525 17.9594 20.6588 18.1465C20.4601 18.3384 20.4547 18.6549 20.6465 18.8535L23.293 21.5H14.5C14.2239 21.5 14 21.7239 14 22ZM27.5 12H16.5C15.1198 12.0013 14.0013 13.1198 14 14.5V18.5C14 18.7761 14.2239 19 14.5 19C14.7761 19 15 18.7761 15 18.5V14.5C15.0009 13.6719 15.6719 13.0009 16.5 13H27.5C28.3281 13.0009 28.9991 13.6719 29 14.5V29.5C28.9991 30.3281 28.3281 30.9991 27.5 31H16.5C15.6719 30.9991 15.0009 30.3281 15 29.5V25.5C15 25.2239 14.7761 25 14.5 25C14.2239 25 14 25.2239 14 25.5V29.5C14.0013 30.8802 15.1198 31.9987 16.5 32H27.5C28.8802 31.9987 29.9987 30.8802 30 29.5V14.5C29.9987 13.1198 28.8802 12.0013 27.5 12Z" fill="#566474" />
                <path d="M23.293 22.5L24.0001 23.2071L25.7073 21.5H23.293V22.5ZM20.6465 25.1465L19.9394 24.4394L19.9394 24.4394L20.6465 25.1465ZM20.5001 25.4999L21.5001 25.5002V25.4999H20.5001ZM21 26L21.0009 25H21.0002L21 26ZM21.3535 25.8535L20.6463 25.1464L20.6452 25.1476L21.3535 25.8535ZM24.8535 21.6465L24.1463 22.3537L24.1466 22.3539L24.8535 21.6465ZM21.3535 18.1465L22.0606 17.4394L22.0544 17.4333L22.0482 17.4273L21.3535 18.1465ZM20.6588 18.1465L19.9641 17.4272L19.964 17.4273L20.6588 18.1465ZM20.6465 18.8535L19.9272 19.5482L19.9332 19.5545L19.9394 19.5606L20.6465 18.8535ZM23.293 21.5V22.5H25.7073L24.0001 20.7929L23.293 21.5ZM27.5 12L27.5009 11H27.5V12ZM16.5 12V11L16.4991 11L16.5 12ZM14 14.5L13 14.4991V14.5H14ZM15 14.5L14 14.4989V14.5H15ZM16.5 13V12L16.4989 12L16.5 13ZM27.5 13L27.5011 12H27.5V13ZM29 14.5H30L30 14.4989L29 14.5ZM29 29.5L30 29.5011V29.5H29ZM27.5 31V32H27.5011L27.5 31ZM16.5 31L16.4989 32H16.5V31ZM15 29.5H14L14 29.5011L15 29.5ZM14 29.5H13L13 29.5009L14 29.5ZM16.5 32L16.4991 33H16.5V32ZM27.5 32V33H27.5009L27.5 32ZM30 29.5L31 29.5009V29.5H30ZM30 14.5H31V14.4991L30 14.5ZM13 22C13 22.8284 13.6716 23.5 14.5 23.5V21.5C14.7762 21.5 15 21.7238 15 22H13ZM14.5 23.5H23.293V21.5H14.5V23.5ZM22.5859 21.7929L19.9394 24.4394L21.3536 25.8536L24.0001 23.2071L22.5859 21.7929ZM19.9394 24.4394C19.6581 24.7206 19.5001 25.1021 19.5001 25.4999H21.5001C21.5001 25.6327 21.4473 25.7599 21.3536 25.8536L19.9394 24.4394ZM19.5001 25.4997C19.4999 26.3284 20.1716 26.9998 20.9998 27L21.0002 25C21.2761 25.0001 21.5001 25.2237 21.5001 25.5002L19.5001 25.4997ZM20.9991 27C21.3975 27.0004 21.78 26.8421 22.0617 26.5595L20.6452 25.1476C20.7397 25.0528 20.8678 24.9999 21.0009 25L20.9991 27ZM22.0606 26.5606L25.5606 23.0606L24.1463 21.6464L20.6463 25.1464L22.0606 26.5606ZM25.5606 23.0606C25.5605 23.0606 25.5605 23.0607 25.5605 23.0607C25.5604 23.0607 25.5603 23.0608 25.5602 23.061C25.5602 23.061 25.5601 23.0611 25.5599 23.0613C25.5599 23.0613 25.5594 23.0618 25.5588 23.0624C25.5586 23.0626 25.5582 23.063 25.5578 23.0634C25.5575 23.0637 25.5563 23.0648 25.5548 23.0663C25.5543 23.0668 25.5521 23.069 25.5493 23.0717C25.5475 23.0734 25.5425 23.0782 25.5392 23.0813C25.5309 23.089 25.4618 23.1472 25.3972 23.1927C24.1096 23.0218 24.0968 21.6997 24.1173 21.6767C24.1226 21.671 24.1304 21.6627 24.1328 21.6602C24.1343 21.6587 24.1366 21.6563 24.1375 21.6554C24.1382 21.6547 24.1393 21.6536 24.1397 21.6531C24.1415 21.6513 24.1428 21.65 24.143 21.6498C24.1435 21.6493 24.1439 21.6489 24.1441 21.6487C24.1445 21.6483 24.1448 21.648 24.1449 21.6478C24.1452 21.6476 24.1454 21.6473 24.1455 21.6473C24.1456 21.6472 24.1457 21.6471 24.1457 21.6471C24.1458 21.647 24.1459 21.6469 24.1459 21.6469C24.146 21.6468 24.146 21.6467 24.1461 21.6467C24.1461 21.6467 24.1462 21.6466 24.1462 21.6465C24.1463 21.6465 24.1463 21.6464 24.1464 21.6463C24.1465 21.6463 24.1465 21.6462 24.1466 21.6461C24.1467 21.6461 24.1469 21.6458 24.1472 21.6456C24.1473 21.6454 24.1476 21.6451 24.1481 21.6447C24.1483 21.6445 24.1486 21.6441 24.1491 21.6436C24.1494 21.6434 24.1508 21.642 24.1525 21.6403C24.153 21.6398 24.1542 21.6386 24.1549 21.6379C24.1559 21.637 24.1585 21.6345 24.1601 21.633C24.1629 21.6303 24.1723 21.6214 24.1789 21.6153C24.2106 21.5876 25.5535 21.6394 25.6578 22.9477C25.6268 22.9875 25.5872 23.0329 25.5806 23.04C25.5778 23.0429 25.5735 23.0475 25.5719 23.0491C25.5693 23.0518 25.5672 23.0539 25.5667 23.0544C25.5653 23.0559 25.5641 23.057 25.5639 23.0573C25.5635 23.0577 25.5631 23.0581 25.5629 23.0582C25.5623 23.0589 25.5618 23.0594 25.5618 23.0594C25.5616 23.0595 25.5615 23.0597 25.5615 23.0597C25.5614 23.0598 25.5613 23.0599 25.5612 23.06C25.5612 23.06 25.5612 23.06 25.5611 23.06L24.1458 21.647C24.1458 21.647 24.1456 21.6472 24.1454 21.6473C24.1454 21.6474 24.1452 21.6475 24.1451 21.6477C24.1451 21.6477 24.1446 21.6482 24.1439 21.6488C24.1438 21.649 24.1434 21.6494 24.143 21.6498C24.1427 21.65 24.1416 21.6512 24.1402 21.6527C24.1397 21.6532 24.1376 21.6553 24.135 21.658C24.1334 21.6596 24.129 21.6642 24.1262 21.6671C24.1196 21.6742 24.0801 21.7195 24.0491 21.7594C24.1534 23.0676 25.4963 23.1195 25.528 23.0917C25.5346 23.0856 25.544 23.0768 25.5468 23.0741C25.5484 23.0726 25.5509 23.0701 25.5519 23.0691C25.5526 23.0685 25.5538 23.0673 25.5543 23.0668C25.5561 23.065 25.5575 23.0636 25.5577 23.0634C25.5582 23.0629 25.5586 23.0626 25.5588 23.0624C25.5592 23.062 25.5596 23.0616 25.5597 23.0615C25.56 23.0612 25.5602 23.061 25.5602 23.0609C25.5603 23.0608 25.5604 23.0608 25.5605 23.0607C25.5606 23.0606 25.5606 23.0606 25.5607 23.0605C25.5607 23.0604 25.5608 23.0604 25.5609 23.0603C25.5609 23.0603 25.561 23.0602 25.561 23.0601C25.5611 23.0601 25.5611 23.06 25.5612 23.0599C25.5613 23.0599 25.5614 23.0598 25.5615 23.0597C25.5615 23.0597 25.5617 23.0594 25.562 23.0592C25.5621 23.059 25.5625 23.0587 25.5629 23.0583C25.5631 23.0581 25.5634 23.0577 25.5639 23.0572C25.5641 23.057 25.5655 23.0557 25.5672 23.0539C25.5677 23.0534 25.5688 23.0523 25.5694 23.0516C25.5704 23.0507 25.5727 23.0483 25.5741 23.0468C25.5766 23.0443 25.5844 23.036 25.5897 23.0303C25.6101 23.0073 25.5974 21.6852 24.3097 21.5143C24.2452 21.5598 24.176 21.6179 24.1677 21.6257C24.1644 21.6288 24.1594 21.6336 24.1577 21.6353C24.1548 21.638 24.1526 21.6402 24.1521 21.6407C24.1506 21.6422 24.1494 21.6433 24.1492 21.6436C24.1487 21.644 24.1484 21.6444 24.1482 21.6446C24.1476 21.6452 24.147 21.6457 24.147 21.6457C24.1469 21.6459 24.1468 21.646 24.1467 21.6461C24.1465 21.6462 24.1464 21.6464 24.1463 21.6464L25.5606 23.0606ZM25.5608 23.0604C26.1457 22.4751 26.1468 21.5253 25.5603 20.9392L24.1466 22.3539C23.9506 22.158 23.9514 21.8414 24.1461 21.6466L25.5608 23.0604ZM25.5606 20.9394L22.0606 17.4394L20.6463 18.8537L24.1463 22.3537L25.5606 20.9394ZM22.0482 17.4273C21.4669 16.8658 20.5453 16.8659 19.9641 17.4272L21.3534 18.8659C21.1597 19.0529 20.8526 19.0531 20.6587 18.8658L22.0482 17.4273ZM19.964 17.4273C19.3682 18.0028 19.3517 18.9524 19.9272 19.5482L21.3658 18.1588C21.5576 18.3574 21.5521 18.674 21.3535 18.8658L19.964 17.4273ZM19.9394 19.5606L22.5859 22.2071L24.0001 20.7929L21.3536 18.1464L19.9394 19.5606ZM23.293 20.5H14.5V22.5H23.293V20.5ZM14.5 20.5C13.6716 20.5 13 21.1716 13 22H15C15 22.2762 14.7762 22.5 14.5 22.5V20.5ZM27.5 11H16.5V13H27.5V11ZM16.4991 11C14.5673 11.0018 13.0018 12.5673 13 14.4991L15 14.5009C15.0008 13.6723 15.6723 13.0008 16.5009 13L16.4991 11ZM13 14.5V18.5H15V14.5H13ZM13 18.5C13 19.3284 13.6716 20 14.5 20V18C14.7762 18 15 18.2238 15 18.5H13ZM14.5 20C15.3284 20 16 19.3284 16 18.5H14C14 18.2238 14.2238 18 14.5 18V20ZM16 18.5V14.5H14V18.5H16ZM16 14.5011C16.0003 14.2245 16.2245 14.0003 16.5011 14L16.4989 12C15.1194 12.0015 14.0015 13.1194 14 14.4989L16 14.5011ZM16.5 14H27.5V12H16.5V14ZM27.4989 14C27.7755 14.0003 27.9997 14.2245 28 14.5011L30 14.4989C29.9985 13.1194 28.8806 12.0015 27.5011 12L27.4989 14ZM28 14.5V29.5H30V14.5H28ZM28 29.4989C27.9997 29.7755 27.7755 29.9997 27.4989 30L27.5011 32C28.8806 31.9985 29.9985 30.8806 30 29.5011L28 29.4989ZM27.5 30H16.5V32H27.5V30ZM16.5011 30C16.2245 29.9997 16.0003 29.7755 16 29.4989L14 29.5011C14.0015 30.8806 15.1194 31.9985 16.4989 32L16.5011 30ZM16 29.5V25.5H14V29.5H16ZM16 25.5C16 24.6716 15.3284 24 14.5 24V26C14.2238 26 14 25.7762 14 25.5H16ZM14.5 24C13.6716 24 13 24.6716 13 25.5H15C15 25.7762 14.7762 26 14.5 26V24ZM13 25.5V29.5H15V25.5H13ZM13 29.5009C13.0018 31.4327 14.5673 32.9982 16.4991 33L16.5009 31C15.6723 30.9992 15.0008 30.3277 15 29.4991L13 29.5009ZM16.5 33H27.5V31H16.5V33ZM27.5009 33C29.4327 32.9982 30.9982 31.4327 31 29.5009L29 29.4991C28.9992 30.3277 28.3277 30.9992 27.4991 31L27.5009 33ZM31 29.5V14.5H29V29.5H31ZM31 14.4991C30.9982 12.5673 29.4327 11.0018 27.5009 11L27.4991 13C28.3277 13.0008 28.9992 13.6723 29 14.5009L31 14.4991Z" fill="#566474" mask="url(#path-2-inside-1_0_3)" />
            </svg></button>
            <div className={styles.line}></div>
            <Sidebar setLocked={setLocked} setCurrFolder={setCurrFolder}/>
            {!loggedIn ? <SetPin setLoggedIn={setLoggedIn} setLocked={setLocked} setSetting={setSetting} /> : ""}
            {loggedIn && locked ? <EnterPin setLocked={setLocked} /> : ""}
            <BreadCrumb currFolder={currFolder}/>
        </div>
    )
};
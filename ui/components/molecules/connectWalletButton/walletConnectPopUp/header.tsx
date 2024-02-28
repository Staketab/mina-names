import React from 'react';
import style from './WalletConnectPopUp.module.css';
import headerBG from './img/headerBG.png';
import CloseIcon from './img/CloseIcon.svg';
import WalletConnectPopUpProgress from './stepProgress';
import Image from 'next/image';
import classNames from 'classnames';
import { interSemiBold } from '@/app/fonts';

const WalletConnectPopUpHeader = ({ step, onClose, message, action, isMobile }) => {
    return (
        <div className={style.header} style={{ backgroundImage: `url(${headerBG})` }}>
            {!isMobile && (
                <div className={style.heading}>
                    <div className={style.closeBtn} onClick={onClose}>
                        <Image src={CloseIcon} alt="" />
                    </div>
                </div>
            )}
            <p className={classNames(style.title, interSemiBold.className)}>{action}</p>
            <div className={style.progressContainer}>
                <WalletConnectPopUpProgress step={step} />
            </div>
            <p className={classNames(style.message, 't-inter-medium')}>{message}</p>
        </div>
    );
};

export default WalletConnectPopUpHeader;

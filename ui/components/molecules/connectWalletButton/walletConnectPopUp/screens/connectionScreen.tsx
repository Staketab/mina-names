import React from 'react';
import style from './Screens.module.css';
import { Button } from '../../../../atoms/button';
import classNames from 'classnames';
import Image from 'next/image';
import { interSemiBold } from '@/app/fonts';

const ConnectingScreen = ({ onReturn, walletName, walletImg }) => {
    return (
        <div className={style.connectingScreen}>
            <p className={classNames(style.screenTitle, interSemiBold.className)}>Mina Wallet</p>
            <div className={style.loadingWrapper}>
                <div className={style.loadingWrapperIcon}>
                    <Image src={walletImg} alt="" />
                </div>
            </div>
            <p className={classNames(style.connectingScreenSubtitle, 't-inter-bold')}>
                Opening {walletName ?? 'wallet'}...
            </p>
            <p className={classNames(style.connectingScreenText, 't-inter-medium')}>
                Confirm connection in the extension.
            </p>
            <Button text="Back to wallets" onClick={onReturn} className={style.connectingScreenButton} />
            <p className={classNames(style.connectingScreenHelp, interSemiBold.className)}>
                No pop-up? Check if your {walletName ?? 'wallet'} extension is unlocked.
            </p>
        </div>
    );
};

export default ConnectingScreen;

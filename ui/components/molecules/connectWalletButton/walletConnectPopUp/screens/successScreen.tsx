import React, { useEffect } from 'react';
import style from './Screens.module.css';
import success from '../img/success.png';
import Image from 'next/image';
import classNames from 'classnames';
import { interSemiBold } from '@/app/fonts';

type SuccessScreenProps = {
    onClose: () => void;
    onResolve?: (value: string) => void;
    walletName: string;
};

const SuccessScreen = ({ onClose, walletName }: SuccessScreenProps): JSX.Element => {
    useEffect(() => {
        const timeout = setTimeout(onClose, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className={style.connectingScreen}>
            <p className={classNames(style.screenTitle, interSemiBold.className)}>Mina Wallet</p>
            <Image src={success} alt="Success!" />
            <p className={classNames(style.connectingScreenSubtitle, interSemiBold.className)}>
                <span>{walletName ?? 'wallet'}</span> Connected!
            </p>
        </div>
    );
};

export default SuccessScreen;

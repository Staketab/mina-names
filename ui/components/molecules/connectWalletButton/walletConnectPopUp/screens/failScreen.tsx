import Triangle from '../img/Triangle.svg';
import Image, { StaticImageData } from 'next/image';
import { Button } from '../../../../atoms/button';
import classNames from 'classnames';

import style from './Screens.module.css';
import { interSemiBold } from '@/app/fonts';

type FailScreenProps = {
    walletName: string;
    walletImg?: StaticImageData;
    installed?: boolean;
    onReturn?: () => void;
    onRetry?: (walletName: string, installed?: boolean) => void;
};

const FailScreen = ({ walletName, walletImg, installed, onReturn, onRetry }: FailScreenProps): JSX.Element => {
    return (
        <div className={style.failScreen}>
            <p className={classNames(style.screenTitle, interSemiBold.className)}>Mina Wallet</p>
            <div className={style.loadingWrapper}>
                <div className={style.failIcon}>
                    <Image src={Triangle} alt="" className={style.failIconTriangle} />
                </div>
                <div className={style.loadingWrapperIcon}>
                    <Image src={walletImg} alt="" />
                </div>
            </div>
            <p className={style.failScreenSubtitle}>Connection Rejected!</p>
            <Button
                text="Try again"
                className={style.failScreenButton}
                onClick={() => onRetry(walletName, installed)}
            />
            <p className={style.failScreenBack} onClick={onReturn}>
                Back to wallets
            </p>
        </div>
    );
};

export default FailScreen;

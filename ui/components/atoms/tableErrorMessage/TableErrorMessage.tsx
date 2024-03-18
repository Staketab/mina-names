import React from 'react';
import noDataIcon from './img/tablePlaceholder.svg';

import styles from './index.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import { interSemiBold } from '@/app/fonts';

const TableErrorMessage = () => {
    return (
        <div className={classNames(styles.errorScreen, 'container')}>
            <Image src={noDataIcon} alt="" />
            <p className={classNames(styles.errorTitle, interSemiBold.className)}>There is no data yet</p>
        </div>
    );
};
export default TableErrorMessage;

import classNames from 'classnames';
import styles from './index.module.css';
import { formatNum } from '../../../../../comman/helpers';
import { interMedium } from '@/app/fonts';

type AmountTemplateProps = {
    data: any;
    config: {
        fields: {
            value: string;
            additionValue?: string;
        };
    };
};

const AmountTemplate = ({ data, config }: AmountTemplateProps): JSX.Element => {
    const value = data[config.fields.value];
    const additionValue = data[config.fields.additionValue] || config.fields.additionValue;

    return (
        <div className={classNames(interMedium.className, styles.stringTemplate)}>
            <>
                {formatNum(value, 2, true, true)}
                {additionValue && <span className={styles.addionValue}>{additionValue}</span>}
            </>
        </div>
    );
};

export default AmountTemplate;

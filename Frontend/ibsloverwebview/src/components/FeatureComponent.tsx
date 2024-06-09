import React from 'react'

interface FeatureComponentProps {
    Icon?: string;
    lable: string;
    status: string | undefined;
    key: number
}

const FeatureComponent = ({ Icon, lable, status, key }: FeatureComponentProps) => {
    const getStatusIcon = (status: string | undefined) => {
        switch (status) {
            case 'yes':
                return '✅';
            case 'no':
                return '❌';
            case 'dont know':
                return '❓';
            default:
                return '❓';
        }
    };
    return (
        <li className='flex flex-row justify-between w-2/3' key={key}>
            <div>
                Icon
                <span className='pl-2'>{lable}</span>
            </div>
            <div>{getStatusIcon(status)}</div>
        </li>
    )
}

export default FeatureComponent
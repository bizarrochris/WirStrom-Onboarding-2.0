
import React from 'react';

export const PercentageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 10h.01M17 14h.01M9 15a1 1 0 100-2 1 1 0 000 2zm6-5a1 1 0 100-2 1 1 0 000 2zM19 5L5 19" />
    </svg>
);

export const DocumentIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className ?? "h-8 w-8 text-white"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export const EmailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-black" viewBox="0 0 64 64" fill="none">
      <g stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M54 18H10a2 2 0 00-2 2v24a2 2 0 002 2h44a2 2 0 002-2V20a2 2 0 00-2-2z" />
        <path d="M8 20l24 16 24-16" />
      </g>
      <path d="M29.333 34.667l-2.666-2L32 28l5.333 4.667-2.666 2L32 32l-2.667 2.667z" fill="#66b84d" />
    </svg>
);

export const PhoneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className ?? "h-20 w-20 text-black"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

export const LockClosedIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M11.7072 15.2071L17.2072 9.70709L15.793 8.29291L11.0001 13.0858L8.70715 10.7929L7.29297 12.2071L10.293 15.2071C10.6835 15.5977 11.3167 15.5977 11.7072 15.2071Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.0589 2.27185C12.8165 2.18518 12.5746 2.09656 12.3357 2.00067L11.6659 2C11.5479 2.04755 11.4291 2.09314 11.3099 2.13757C11.1873 2.18329 11.0643 2.22778 10.9411 2.27185C10.4763 2.43805 9.81909 2.6601 9.05273 2.88202C7.50385 3.33051 5.57422 3.75897 3.90002 3.75897C3.40295 3.75897 3 4.1673 3 4.67102V11.9675C3 15.592 5.30371 18.1102 7.42303 19.6614C8.49493 20.4459 9.56104 21.0154 10.3563 21.3885C10.7551 21.5757 11.0891 21.7148 11.3257 21.8082C11.3555 21.8198 11.3854 21.832 11.4156 21.8443C11.6027 21.9202 11.7994 22 12 22C12.2005 22 12.3923 21.9222 12.5814 21.8455L12.5889 21.8424L12.5947 21.84C12.6212 21.8293 12.6478 21.8186 12.6743 21.8082C12.9109 21.7148 13.2449 21.5757 13.6437 21.3885C14.439 21.0154 15.5051 20.4459 16.5769 19.6614C18.6963 18.1102 21 15.592 21 11.9675V4.67102C21 4.1673 20.597 3.75897 20.1 3.75897C18.4258 3.75897 16.4961 3.33051 14.9473 2.88202C14.1809 2.6601 13.5237 2.43805 13.0589 2.27185ZM19 11.9675C19 14.6487 17.3064 16.6438 15.3983 18.0403C14.4725 18.718 13.46 19.2401 12.4451 19.7635C12.2967 19.8401 12.1483 19.9166 12 19.9937C11.8517 19.9166 11.7033 19.8401 11.5549 19.7635C10.54 19.2401 9.52753 18.718 8.60175 18.0403C6.69366 16.6438 5 14.6487 5 11.9675V5.71844C6.63104 5.58502 8.29749 5.18909 9.6073 4.80988C10.4168 4.5755 11.2083 4.29871 12 4.0116C12.7917 4.29871 13.5832 4.5755 14.3927 4.80988C15.7025 5.18909 17.3689 5.58502 19 5.71844V11.9675Z" fill="currentColor"/>
    </svg>
);

export const CalendarDaysIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
        <path d="M10 3V5H14V3H16V5H20C20.5523 5 21 5.44772 21 6V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V6C3 5.44772 3.44772 5 4 5H8V3H10ZM18.999 13H4.999L5 19H19L18.999 13ZM16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15ZM8 7H5L4.999 11H18.999L19 7H16V9H14V7H10V9H8V7Z" fill="currentColor"/>
    </svg>
);

export const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.95105 13.002V20.002H3.95105V13.002H2.95105ZM1.95105 11.002C1.39877 11.002 0.95105 11.4497 0.95105 12.002V21.002C0.95105 21.5543 1.39877 22.002 1.95105 22.002H4.95105C5.50333 22.002 5.95105 21.5543 5.95105 21.002V12.002C5.95105 11.4497 5.50333 11.002 4.95105 11.002H1.95105Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.45105 12.002H5.45105C6.16786 12.002 7.64544 12.3578 9.27549 13.502H11.7485C13.2058 13.502 14.2084 14.6705 14.2518 15.93L18.8175 14.5871C20.367 14.1314 21.9992 14.9843 22.51 16.5166L22.7458 17.224C23.0028 17.995 22.5991 18.8304 21.8354 19.1081L11.6345 22.8175C11.193 22.978 10.7091 22.978 10.2676 22.8175L4.45105 20.7024V12.002ZM6.45105 14.2433V19.3015L10.951 20.9379L20.6946 17.3948L20.6126 17.149C20.4424 16.6382 19.8983 16.354 19.3818 16.5059L13.0489 18.3685C12.0059 18.6752 11.1975 17.4442 11.8935 16.609L12.1326 16.3221C12.404 15.9964 12.1724 15.502 11.7485 15.502H8.61772L8.35105 15.302C7.62328 14.7561 6.96187 14.4316 6.45105 14.2433Z" fill="currentColor"/>
        <path d="M15.576 1.45413C16.5776 1.03924 17.6797 0.930687 18.7431 1.14219C19.8064 1.3537 20.7831 1.87577 21.5497 2.64238L20.6884 3.50373C20.0921 2.90747 19.3324 2.50142 18.5054 2.33691C17.6784 2.17241 16.8212 2.25684 16.0421 2.57953C15.2631 2.90222 14.5972 3.44867 14.1287 4.14979C14.0128 4.32326 13.9103 4.50427 13.8216 4.69124H19.5009L18.8918 5.90937H13.454C13.425 6.11028 13.4102 6.3138 13.4102 6.51843C13.4102 6.72307 13.425 6.92658 13.454 7.12749H18.2827L17.6737 8.34562H13.8216C13.9103 8.53259 14.0128 8.7136 14.1287 8.88707C14.5972 9.58819 15.2631 10.1346 16.0421 10.4573C16.8212 10.78 17.6784 10.8645 18.5054 10.7C19.3325 10.5354 20.0921 10.1294 20.6884 9.53314L21.5497 10.3945C20.7831 11.1611 19.8064 11.6832 18.7431 11.8947C17.6797 12.1062 16.5776 11.9976 15.576 11.5827C14.5743 11.1679 13.7182 10.4653 13.1159 9.56383C12.8612 9.18269 12.6568 8.77325 12.5056 8.34562H10.974V7.12749H12.226C12.2035 6.92594 12.1921 6.72262 12.1921 6.51843C12.1921 6.31425 12.2035 6.11093 12.226 5.90937H10.974V4.69124H12.5056C12.6568 4.26362 12.8612 3.85417 13.1159 3.47304C13.7182 2.5716 14.5743 1.86901 15.576 1.45413Z" fill="currentColor"/>
    </svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

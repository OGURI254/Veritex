export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-full border border-transparent bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 active:bg-primary-900 shadow-lg shadow-primary-500/20 dark:focus:ring-offset-darkbg-200 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

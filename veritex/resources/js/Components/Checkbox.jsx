export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-white/10 text-secondary-500 shadow-sm focus:ring-secondary-500 bg-darkbg-200 dark:focus:ring-offset-darkbg-200 ' +
                className
            }
        />
    );
}

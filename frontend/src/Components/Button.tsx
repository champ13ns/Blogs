import React from 'react'
const Button = function ({ bname, onClick, loading }) {
    return (
        <div>
            {
                loading === false ?
                    (<button

                        type="button" onClick={onClick}
                        className="w-full rounded-md mt-4 w-24 inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3">
                        {bname}
                    </button>) :
                    (
                        <button

                            type="button" disabled onClick={onClick}
                            className="w-full rounded-md mt-4 w-24 inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            {bname}
                        </button>
                    )
            }

        </div>
    )
}

export default Button
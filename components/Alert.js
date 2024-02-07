import React from 'react'

const Alert = ({message}) => {
  return (
      <div role="alert" className="absolute bottom-10 left-[40%] z-10 rounded-xl border border-gray-100 !bg-gray-50 p-4">
          <div className="flex items-start gap-4">
              <span className="text-green-600">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                  </svg>
              </span>

              <div className="flex-1">

                  <p className="mt-1 text-sm text-gray-700">{message}</p>
              </div>
          </div>
      </div>
  )
}

export default Alert
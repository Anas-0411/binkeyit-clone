import React from 'react'

const CardLoading = () => {
  return (
    <div className="max-w-52 p-4 rounded shadow-md animate-pulse grid gap-2">
      <div className="min-h-20 bg-blue-100"></div>
      <div className="p-3 bg-blue-100 rounded w-20"></div>
      <div className="p-3 bg-blue-100 rounded"></div>
      <div className="p-3 bg-blue-100 rounded w-15"></div>

      <div className="flex items-center justify-between gap-4">
        <div className="p-3 bg-blue-100 rounded w-20"></div>
        <div className="p-3 bg-blue-100 rounded w-20"></div>
      </div>
    </div>
  );
}

export default CardLoading
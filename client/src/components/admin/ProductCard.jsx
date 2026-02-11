import React from 'react'

const ProductCard = ({data}) => {
  return (
    <section className="w-36 p-4 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-400">{data?.unit}</p>
    </section>
  );
}

export default ProductCard
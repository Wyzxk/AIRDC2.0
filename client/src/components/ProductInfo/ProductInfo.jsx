import React, { useState } from "react";

export function ProductInfo({ name, price, stock, description, image }) {
  return (
    <>
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
              <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  class="w-full h-full object-cover"
                  src={image}
                  alt="Product Image"
                />
              </div>
            </div>
            <div class="md:flex-1 px-4">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {name}
              </h2>
              <div class="flex mb-4">
                <div class="mr-4">
                  <span class="font-bold text-gray-700 dark:text-gray-300">
                    Precio:&nbsp;
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">
                    {price.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span class="font-bold text-gray-700 dark:text-gray-300">
                    Disponibles:&nbsp;
                  </span>
                  <span class="text-gray-600 dark:text-gray-300">{stock}</span>
                </div>
              </div>

              <div>
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Descripción:
                </span>
                <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {description}
                </p>
              </div>
              <div class="flex -mx-2 mb-4 mt-10">
                <div class="w-1/2 px-2">
                  <button class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Comprar ahora
                  </button>
                </div>
                <div class="w-1/2 px-2">
                  <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Añadir al carro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

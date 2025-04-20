import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { Alert } from 'react-native';
import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { useRef } from "react";

export const useProduct = (productId: string) => {

  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);


  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  const productMutation = useMutation({

    mutationFn: async(data: Product) => updateCreateProduct({
      ...data,
      id: productIdRef.current
    }),

    onSuccess(data: Product){

      productIdRef.current = data.id;

      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      })

      queryClient.invalidateQueries({
        queryKey: ['product', data.id],
      })

      Alert.alert('Producto guardado', `${data.title} se guardo correctamente`)

    }

  })
  

  return {
    productQuery,
    productMutation
  };
};

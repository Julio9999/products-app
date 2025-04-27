import { useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';

import ProductImages from '@/presentation/products/components/ProductImages';
import { useProduct } from '@/presentation/products/hooks/useProduct';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { Size } from '@/core/products/interfaces/product.interface';
import MenuIconButton from '@/presentation/theme/components/MenuIconButton';
import { useCameraStore } from '@/presentation/store/useCameraStore';

const ProductScreen = () => {

  const { selectedImages, clearImages } = useCameraStore();

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(`${id}`)

  useEffect(() => {
    return () => {
      clearImages();
    }
  }, [])

  useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push('/camera')}
          icon='camera-outline'
        />
      )
    })

  }, [])

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title
      })
    }
  }, [productQuery.data])


  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    )
  }


  if (!productQuery.data) {
    return <Redirect href='/(products-app)/(home)' />
  }

  const product = productQuery.data!;


  return (
    <Formik
      initialValues={product}
      onSubmit={(productLike) => productMutation.mutate(
        {
          ...productLike,
          images: [...productLike.images, ...selectedImages]
        }
      )}
    >
      {
        ({ values, handleSubmit, handleChange, setFieldValue }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              refreshControl={
                <RefreshControl 
                  refreshing={productQuery.isFetching} 
                  onRefresh={async() => {
                    await productQuery.refetch()
                  }}
                />
              }
            >

              <ProductImages images={[...product.images, ...selectedImages]} />

              <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
                <ThemedTextInput
                  placeholder='Título'
                  style={{ marginVertical: 5 }}
                  value={values.title}
                  onChangeText={handleChange('title')}

                />

                <ThemedTextInput
                  placeholder='Slug'
                  style={{ marginVertical: 5 }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}

                />

                <ThemedTextInput
                  placeholder='Descripción'
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                  value={values.description}
                  onChangeText={handleChange('description')}

                />
              </ThemedView>

              <ThemedView style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: 'row',
                gap: 10
              }}>

                <ThemedTextInput
                  placeholder='Precio'
                  style={{ flex: 1 }}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}

                />

                <ThemedTextInput
                  placeholder='Inventario'
                  style={{ flex: 1 }}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}

                />


              </ThemedView>

              <ThemedView style={{
                marginHorizontal: 10
              }}>
                <ThemedButtonGroup
                  options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                  selectedOptions={values.sizes}
                  onSelect={(selectedSize) => {

                    const newSizesValue = values.sizes.includes(selectedSize as Size)
                      ? values.sizes.filter((s) => s !== selectedSize)
                      : [...values.sizes, selectedSize]
                    console.log(newSizesValue)

                    setFieldValue('sizes', newSizesValue)
                  }}
                />

                <ThemedButtonGroup
                  options={['kid', 'men', 'women', 'unisex']}
                  selectedOptions={[values.gender]}
                  onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}
                />
              </ThemedView>

              <View
                style={{
                  marginHorizontal: 10,
                  marginBottom: 50,
                  marginTop: 20
                }}
              >
                <ThemedButton
                  icon='save-outline'
                  onPress={() => handleSubmit()}
                >
                  Guardar
                </ThemedButton>
              </View>


            </ScrollView>
          </KeyboardAvoidingView>
        )
      }

    </Formik>
  )
}

export default ProductScreen;
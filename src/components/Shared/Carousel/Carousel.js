import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './Carousel.styles'
import CarouselSnap, { Pagination } from 'react-native-snap-carousel'
import { Image } from 'react-native-elements'
import { size } from 'lodash'
import { Modal } from '../Modal'

export function Carousel({ images, width, height, hideDots }) {
    const [activeDotIndex, setActiveDotIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const onCloseOpenModal = () => setShowModal((prev) => !prev);

    const handlePressImage = (index) => {
        setSelectedImage(images[index])
        setShowModal(true)
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handlePressImage(index)}>
            <Image
                source={{ uri: item }}
                style={{ height, width }}
            />
        </TouchableOpacity>
    )

    const pagination = () => {
        return (
            <Pagination
                dotsLength={size(images)}
                activeDotIndex={activeDotIndex}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.dotsContainer}
                dotStyle={styles.dot}
            />
        )
    }

    return (
        <View style={styles.content}>
            <CarouselSnap
                layout='default'
                data={images}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveDotIndex(index)}
            />
            {
                !hideDots && pagination()
            }
            <Modal show={showModal} close={onCloseOpenModal}>
                <View style={{ width: "100%", height: 500 }}>
                    <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%', resizeMode: "contain" }} />
                </View>
            </Modal>
        </View>
    )
}
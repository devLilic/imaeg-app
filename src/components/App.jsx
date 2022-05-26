import '../App.css';
import {useState} from "react";
import ImageBlock from "./ImageBlock";
import {v4 as uuidv4} from 'uuid';
import Modal from "./Modal";
import React from "react";
import {image} from "tailwindcss/lib/util/dataTypes";


function App() {
    const [showModal, setShowModal] = useState(false);

    const [image_edit, setImage_edit] = useState({
        title: null,
        url: '',
    })
    const [images, setImages] = useState([
        {
            id: uuidv4(),
            url: 'https://www.businesswest.co.uk/sites/default/files/styles/event_image/public/blog/featured/shutterstock_439601284_1.jpg?itok=a47EPijY',
            title: '',
            editMode: false,
            cropped: false,
            section: {
                unit: '%',
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
    ])

    function addBlock() {
        setImages([...images, {
            id: uuidv4(),
            url: '',
            title: '',
            editMode: false,
            cropped: false,
            section: {
                unit: '%',
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }])
    }

    function setUrl(url, id) {
        setImages(images.map(img => {
            if (img.id === id) {
                img.url = url;
            }
            return img;
        }))
    }

    function setTitle(title, id) {
        setImages(images.map(img => {
            if (img.id === id) {
                img.title = title;
            }
            return img;
        }))
    }

    function changeEditMode(id) {
        setImages(images.map(img => {
            // change editMode to true for clicked image and false for other images
            img.editMode = img.id === id;
            if (img.id === id) {
                setImage_edit({
                    title: img.title,
                    url: img.url
                })
            }
            return img;
        }))
        setShowModal(true)
    }

    function cropHandler(section) {
        const new_images = images.map(image => {
            if (image.editMode) {
                image.cropped = true;
                image.section = section;
            }
            return image;
        })
        setImages(new_images)
    }

    const [image_to_edit] = images.filter(image => image.editMode)

    function deleteBox(id) {
        setImages(images.filter(image => image.id !== id))
    }

    function downloadImages(){
        images.map(image => {
            
        })
    }

    return (
        // container
        <div className="w-10/12 mx-auto bg-white shadow-lg min-h-screen max-w-5xl p-2 flex justify-center">
            {/* content */}
            <div className="w-full p-2 flex flex-col">
                <button onClick={downloadImages}>Save images</button>
                <Modal image={image_to_edit} isVisible={showModal} crop={section => cropHandler(section)}
                       hideModal={() => setShowModal(false)}/>
                {images && (<ul className="flex flex-col mx-auto items-stretch w-10/12">
                    {images.length ? (images.map((image) =>
                        <ImageBlock key={image.id}
                                    image={image}
                                    setUrl={setUrl}
                                    setTitle={setTitle}
                                    edit={() => changeEditMode(image.id)}
                                    delete={(id) => deleteBox(id)}
                        />
                    )) : (
                        <li className="flex p-2 border border-gray-300 mb-1 bg-gray-100 rounded-lg items-center justify-center">
                            Create Image Block first
                        </li>)}
                </ul>)}

                <div
                    className='w-8/12 mx-auto border border-indigo-300 py-2 text-center text-2xl text-indigo-400 rounded-lg shadow cursor-pointer hover:bg-indigo-200'
                    title="Add new block"
                    onClick={addBlock}
                > +
                </div>
            </div>
        </div>
    );
}

export default App;

import React, {useState} from 'react';

function ImagePreview(props) {
    const [imageParams, setImageParams] = useState({
        aspect: false,
        format: false,
        size: false,
    })

    function spanStyle(condition) {
        return "px-1 py-1 rounded ml-1 " + (condition ? 'bg-green-500' : 'bg-red-500')
    }

    function filter(event) {
        const img = event.target;
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let res = gcd(w, h);

        // filters to check on every image
        const filters = {
            aspect: '16:9',
            format: /(jpg|jpeg|png)$/i,
            size: {
                w: 500,
                h: 300
            }
        }
        // change Image badges according to filters
        const newFilterList = {
            aspect: (`${w / res}:${h / res}` === filters.aspect),
            format: filters.format.test(img.src),
            size: img.naturalWidth >= filters.size.w && img.naturalHeight >= filters.size.h
        }
        setImageParams(newFilterList)

        // find the Greatest Common Divider for both numbers
        function gcd(a, b) {
            return b === 0 ? a : gcd(b, a % b);
        }
    }

    return (
        <div className="w-4/12 ml-2 relative">
            {props.src && (
                <>
                    <img
                        src={props.src}
                        className="h-full float-right"
                        alt="preview"
                        onLoad={filter}
                    />
                    <div className="absolute bottom-2 right-1 text-xs text-white">
                        <span className={spanStyle(imageParams.aspect)}>16:9</span>
                        <span className={spanStyle(imageParams.format)}>IMG</span>
                        <span className={spanStyle(imageParams.size)}>LOW</span>
                    </div>
                </>
            )
            }

        </div>
    );
}

export default ImagePreview;

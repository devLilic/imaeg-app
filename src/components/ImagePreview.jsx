import React, {useState} from 'react';

function ImagePreview(props) {
    const [imageParams, setImageParams] = useState({
        aspect: false,
        format: false,
        size: false,
    })

    const urlPattern = /^(http(s)?:\/\/.)?.+\.(jpg|jpeg|png|webp).*/i;

    // filters to check on every image
    const filters = {
        aspect: '16:9',
        format: /^(http(s)?:\/\/.)?.+\.(jpg|jpeg|png).*/i,
        size: {
            w: 500,
            h: 400
        }
    }

    function spanStyle(condition) {
        return "px-1 py-1 rounded ml-1 " + (condition ? 'bg-green-500' : 'bg-red-500')
    }

    function applyFilters(event) {
        const img = event.target;
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let res = gcd(w, h);

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

    function drawPreviewBlock() {
        return props.src.trim() === '' ?
            '' :
        (urlPattern.test(props.src)) ?
            (
                <>
                    <img
                        src={props.src}
                        className="h-full"
                        alt="preview"
                        onLoad={applyFilters}
                        onClick={props.edit}
                        title={'title'}
                    />
                    <div className="absolute bottom-2 right-1 text-xs text-white">
                        <span className={spanStyle(imageParams.aspect)}
                              title="Aspect ratio">16:9</span>
                        <span className={spanStyle(imageParams.format)}
                              title="Accepted formats: JPG, JPEG or PNG">IMG</span>
                        <span className={spanStyle(imageParams.size)}
                              title={`Minimal image size: ${filters.size.w}px x ${filters.size.h}px`}>LOW</span>
                    </div>
                </>
            ) : (<span className="w-full text-center text-lg text-red-700 bg-red-200 px-3 py-2 rounded-lg self-center">Incorrect url</span>)
    }

    return (
        <div className="sm:w-4/12 w-4/12 ml-2 relative flex justify-end">
            {drawPreviewBlock()}
        </div>
    );
}
// sm:w-10/12 w-6/12
export default ImagePreview;

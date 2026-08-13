const Background = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-20 left-1/4 text-5xl opacity-90 animate-floatSlow">🌸</div>
            <div className="absolute top-1/4 left-12 text-5xl opacity-80 animate-float">🍀</div>
            <div className="absolute top-1/2 left-14 text-5xl opacity-90 animate-rotateSlow">🏡</div>
            <div className="absolute bottom-1/3 left-1/4 text-5xl opacity-80 animate-floatSlow">🌿</div>
            <div className="absolute top-12 left-1/2 text-5xl opacity-80 animate-float">🍂</div>
            <div className="absolute bottom-10 left-1/4 text-5xl opacity-90 animate-floatSlow">🌾</div>

            <div className="absolute top-20 right-1/3 text-5xl opacity-90 animate-floatSlow">🌻</div>
            <div className="absolute top-1/4 right-12 text-5xl opacity-80 animate-rotateSlow">🌳</div>
            <div className="absolute top-1/2 right-1/4 text-5xl opacity-90 animate-float">🍃</div>
            <div className="absolute bottom-1/3 right-16 text-5xl opacity-80 animate-floatSlow">🌰</div>
            <div className="absolute bottom-10 right-20 text-5xl opacity-90 animate-float">🌿</div>
            <div className="absolute bottom-10 right-1/3 text-5xl opacity-80 animate-rotateSlow">🌼</div>
        </div>
    );
};

export default Background;
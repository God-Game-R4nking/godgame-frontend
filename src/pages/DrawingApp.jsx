import React, { useRef, useState, useEffect } from 'react';
import Input from '../components/Input';
import styled from 'styled-components';
import HomeUI from '../components/HomeUI';

const getPenCursor = (color, width = 50, height = 50) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${width}" height="${height}" stroke-width="1" stroke="white" class="size-6">
  <path fill="${color}" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
`;

const getBrushCursor = (color, width = 50, height = 50) => `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="${width}" height="${height}" stroke-width="1" stroke="white" class="size-6">
  <path fill="${color}" stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
</svg>
`;

const getEraserCursor = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" stroke-width="5" stroke="black">
  <rect width="${size}" height="${size}" fill="white" />
</svg>
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Canvas = styled.canvas`
  border: 1px solid #000;
  cursor: ${(props) => props.cursor};
`;

const Tools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ToolButton = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: ${(props) => (props.active ? '#727272' : '#f0f0f0')};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const ColorPicker = styled.input`
  margin: 5px;
`;

const LineWidthSelector = styled.input`
  margin: 5px;
`;

const ResetButton = styled.button`
  margin-right: 5px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const DrawingApp = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [cursor, setCursor] = useState('');
  const [activeTool, setActiveTool] = useState('pen');

  useEffect(() => {
    setCursor(getCursorStyle());
  }, [tool, color, lineWidth]);

  const getCursorStyle = () => {
    switch (tool) {
      case 'pen':
        return `url(data:image/svg+xml;base64,${btoa(getPenCursor(color))}) 3 45, auto`;
      case 'brush':
        return `url(data:image/svg+xml;base64,${btoa(getBrushCursor(color))}) 0 40, auto`;
      case 'eraser':
        return `url(data:image/svg+xml;base64,${btoa(getEraserCursor(lineWidth))}) ${lineWidth / 2} ${lineWidth / 2}, auto`;
      default:
        return 'auto';
    }
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    context.moveTo(x, y);
    context.beginPath();
    setCtx(context);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    console.log(context); // TODO : 공유해야하는거 (그림 정보)

    if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
    } else {
      context.globalCompositeOperation = 'source-over';
    }
    setIsDrawing(true);
  };

  const draw = (event) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = ctx;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.lineTo(x, y);

    if (tool === 'pen') {
      context.lineWidth = lineWidth; // 펜 두께 설정
      context.lineJoin = 'miter'; // 펜 선의 조인 스타일
      context.lineCap = 'butt'; // 펜 선의 끝 스타일
      context.strokeStyle = color;
    } else if (tool === 'brush') {
      context.lineWidth = lineWidth * 2; // 브러쉬 두께 설정
      context.lineJoin = 'round'; // 브러쉬 선의 조인 스타일
      context.lineCap = 'round'; // 브러쉬 선의 끝 스타일
      context.strokeStyle = color;
    } else if (tool === 'paint') {
      // 페인트 도구는 별도의 작업을 필요로 함
      context.fillStyle = color;
      context.floorFill(x, y, color);
      return; // fillRect 후에는 stroke 하지 않음
    } else if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out'; // 지우개
      context.lineWidth = lineWidth; // 지우개 두께 설정
      context.lineJoin = 'miter'; // 펜 선의 조인 스타일
      context.lineCap = 'butt'; // 펜 선의 끝 스타일
    }

    context.stroke(); // 선 그리기
  };


  const endDrawing = () => {
    setIsDrawing(false);
    ctx.closePath();
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleToolChange = (toolType) => {
    setTool(toolType);
    setActiveTool(toolType);
  };

  return (
    <HomeUI gamemode={true}>
      <Container>
        <Tools>
          <ResetButton onClick={resetCanvas}>리셋</ResetButton>
          <ToolButton active={activeTool === 'pen'} onClick={() => handleToolChange('pen')}>펜</ToolButton>
          <ToolButton active={activeTool === 'brush'} onClick={() => handleToolChange('brush')}>브러쉬</ToolButton>
          <ToolButton active={activeTool === 'paint'} onClick={() => handleToolChange('paint')}>페인트 도구</ToolButton>
          <ToolButton active={activeTool === 'eraser'} onClick={() => handleToolChange('eraser')}>지우개</ToolButton>
          <ColorPicker
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <LineWidthSelector
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
          />
          {lineWidth}
        </Tools>
        <Canvas
          ref={canvasRef}
          width={600}
          height={800}
          cursor={getCursorStyle()}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
      </Container>
    </HomeUI>
  );
};

export default DrawingApp;

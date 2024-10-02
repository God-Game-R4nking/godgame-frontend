import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
`;

const Canvas = styled.canvas`
  border: 1px solid #000;
  cursor: crosshair;
`;

const ToolButton = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0;
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
  margin-top: 10px;
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
  const [tool, setTool] = useState('pen'); // 도구 상태
  const [color, setColor] = useState('#000000'); // 색상 상태
  const [lineWidth, setLineWidth] = useState(2); // 선 두께 상태

  const startDrawing = (event) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context.beginPath();
    setCtx(context);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'; // 지우개 도구 설정
    } else {
      ctx.globalCompositeOperation = 'source-over'; // 기본 도구 설정
    }

    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
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

  return (
    <Container>
      <div>
        <ToolButton onClick={() => setTool('pen')}>펜</ToolButton>
        <ToolButton onClick={() => setTool('brush')}>브러쉬</ToolButton>
        <ToolButton onClick={() => setTool('paint')}>페인트 도구</ToolButton>
        <ToolButton onClick={() => setTool('eraser')}>지우개</ToolButton>
        <ColorPicker
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <LineWidthSelector
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(e.target.value)}
        />
      </div>
      <Canvas
        ref={canvasRef}
        width={800}
        height={800}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
      <ResetButton onClick={resetCanvas}>리셋</ResetButton>
    </Container>
  );
};

export default DrawingApp;

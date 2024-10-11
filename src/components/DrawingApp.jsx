import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

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

const getPaintCursor = (color, width = 50, height = 50) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${color}" stroke-width="0.5" stroke="white" class="bi bi-paint-bucket" viewBox="0 0 16 16">
  <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a3 3 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1 1 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4 4 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067S8.857 3.052 8.23 2.704c-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.3 3.3 0 0 1-.131-.673q.137.09.337.274m.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088q.081.181.183.365c.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626q.183.103.365.183l-4.861 4.862-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46s-1.168-1.32-1.46-1.846c-.147-.265-.225-.47-.251-.607l-.01-.068zm2.87-1.935a2.4 2.4 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.5 3.5 0 0 0-1.066.091 11 11 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/>
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
  const [isPaint, setIsPaint] = useState(false);

  useEffect(() => {
    setCursor(getCursorStyle());
    console.log(tool);
  }, [tool, color, lineWidth]);

  const getCursorStyle = () => {
    switch (tool) {
      case 'pen':
        return `url(data:image/svg+xml;base64,${btoa(getPenCursor(color))}) 3 45, auto`;
      case 'brush':
        return `url(data:image/svg+xml;base64,${btoa(getBrushCursor(color))}) 0 40, auto`;
      case 'eraser':
        return `url(data:image/svg+xml;base64,${btoa(getEraserCursor(lineWidth))}) ${lineWidth / 2} ${lineWidth / 2}, auto`;
      case 'paint':
        return `url(data:image/svg+xml;base64,${btoa(getPaintCursor(color))}) 40 40, auto`;
      default:
        return 'auto';
    }
  };

  const floodFill = (x, y, targetColor, fillColor) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const getColor = (x, y) => {
      const index = (y * canvas.width + x) * 4;
      return [data[index], data[index + 1], data[index + 2], data[index + 3]];
    };

    const setColor = (x, y, color) => {
      const index = (y * canvas.width + x) * 4;
      data[index] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      data[index + 3] = color[3];
    };

    const stack = [[x, y]];

    while (stack.length > 0) {
      const [nx, ny] = stack.pop();
      if (nx < 0 || ny < 0 || nx >= canvas.width || ny >= canvas.height) continue;

      const currentColor = getColor(nx, ny);
      // 색상 비교 시 투명도도 고려해야 함
      if (currentColor[0] === targetColor[0] && currentColor[1] === targetColor[1] && currentColor[2] === targetColor[2] && currentColor[3] === targetColor[3]) {
        setColor(nx, ny, fillColor);
        stack.push([nx + 1, ny]);
        stack.push([nx - 1, ny]);
        stack.push([nx, ny + 1]);
        stack.push([nx, ny - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    const targetColor = getColor(x, y);

    const hexToRgba = (hex) => {
      // 해시(#)를 제거하고, 6자리 또는 3자리의 hex를 처리
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        hex = hex.split('').map((h) => h + h).join('');
      }

      // RGB 값을 16진수에서 10진수로 변환
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);

      // RGBA 배열 반환, A는 255로 고정
      return [r, g, b, 255];
    };

    const fillColor = hexToRgba(color); // 원하는 색으로 변경

    // 이미 같은 색상인지 확인
    if (targetColor[0] === fillColor[0] && targetColor[1] === fillColor[1] && targetColor[2] === fillColor[2] && targetColor[3] === fillColor[3]) {
      return; // 이미 같은 색상일 경우 종료
    }

    floodFill(x, y, targetColor, fillColor);
  };

  const getColor = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    return [imageData[0], imageData[1], imageData[2], imageData[3]];
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
    } else if (tool === 'paint') {
      return;
    }
    else if (tool === 'brush') {
      context.lineWidth = lineWidth * 2; // 브러쉬 두께 설정
      context.lineJoin = 'round'; // 브러쉬 선의 조인 스타일
      context.lineCap = 'round'; // 브러쉬 선의 끝 스타일
      context.strokeStyle = color;
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
    if (ctx !== null) ctx.closePath();
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleToolChange = (toolType) => {
    if (toolType === 'paint') setIsPaint(true);
    else setIsPaint(false);

    setTool(toolType);
    setActiveTool(toolType);
  };

  return (
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
          height={530}
          cursor={getCursorStyle()}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onClick={(e) => {
            if (isPaint) handleClick(e);
          }}
        />
      </Container>
  );
};

export default DrawingApp;

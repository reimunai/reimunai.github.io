class Shader
{
    static vertexShaderSource = ``;
    static fragmentShaderSource = ``;

    static getProgramInfoLoc(gl, program)
    {
        return {
            attribLocs :{},
            uniformLocs : {},
        }
    }

    static createProgramInfoData()
    {

    }

    static setProgramInfo(gl, program, programInfoData)
    {
        //setAttribure
        //setUniform
    }

    static initBuffers()
    {

    }
}
//每个着色器程序需要的属性不同，设置顶点属性的方式也不同，应该和着色器封装在一起。
//以下属性设置参考
function attrib(gl, program, attributeNane)
{
    //attribure Location
    var attribLoc = gl.getAttribLocation(program, attributeNane)

    //buffer
    var buffer = gl.createBuffer();//atribute get data from a buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    //gl.ARRAY_BUFFER顶点相关数据，gl.ELEMENT_ARRAY_BUFFER顶点索引数据
    //向gpu传输缓冲区数据
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    //启用attribLoc对应属性
    gl.enableVertexAttribArray(attribLoc);
    gl.vertexAttribPointer(
        attribLoc,
        2,
        gl.FLOAT,
        false,
        0,
        0
    );
}

export class CubeShader extends Shader
{
    static vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    attribute vec2 a_texcoord;
    uniform mat4 u_mvp;

    varying vec3 vcolor;
    varying vec2 v_texcoord;
    varying vec2 uv;

    varying vec3 ndc;
    void main(){
        gl_Position = u_mvp * vec4(a_position, 1.0);
        ndc = (u_mvp * vec4(a_position, 1.0)).xyz;
        uv = (u_mvp * vec4(a_position, 1.0)).xy;
        vcolor = a_color;
        v_texcoord = a_texcoord;
    }
    `;

    static fragmentShaderSource = `
    precision mediump float;
    varying vec3 vcolor;
    varying vec2 v_texcoord;
    varying vec2 uv;
    varying vec3 ndc;
    uniform sampler2D u_texture;
    void main()
    {
        //gl_FragColor = vec4(vcolor, 1.0);
        // if(uv.x >= 0.0 && uv.y >= 0.0)
        // {
        // }
        gl_FragColor = texture2D(u_texture, v_texcoord);
    }
    `;

    static getProgramInfoLoc(gl, program)
    {
        return {
            attribLocs : {
                aPositionLoc : gl.getAttribLocation(program, 'a_position'),
                aColorLoc : gl.getAttribLocation(program, 'a_color'),
                aTexcoordLoc :gl.getAttribLocation(program, 'a_texcoord'),
            },

            uniformLocs : {
                uMvpLoc : gl.getUniformLocation(program, 'u_mvp'),
                uTextureLoc : gl.getUniformLocation(program, 'u_texture'),
            }
        }
    }

    static createProgramInfoData(positionData, colorData, mvpData, texcoordData)
    {
        return {
            aPositionData : positionData,
            aColorData : colorData,
            uMvpData : mvpData,
            aTexcoordData : texcoordData
        }
    }

    static initBuffers(gl)
    {
        return {
            positionBuffer : gl.createBuffer(),
            colorBuffer : gl.createBuffer(),
            texcoordBuffer : gl.createBuffer(),
        }
    }

    static setProgramInfo(gl, programInfoLoc, programInfoData, buffers)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(programInfoData.aPositionData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programInfoLoc.attribLocs.aPositionLoc);
        gl.vertexAttribPointer(
            programInfoLoc.attribLocs.aPositionLoc,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(programInfoData.aColorData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programInfoLoc.attribLocs.aColorLoc);
        gl.vertexAttribPointer(
            programInfoLoc.attribLocs.aColorLoc,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(programInfoData.aTexcoordData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programInfoLoc.attribLocs.aTexcoordLoc);
        gl.vertexAttribPointer(
            programInfoLoc.attribLocs.aTexcoordLoc,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.uniformMatrix4fv(programInfoLoc.uniformLocs.uMvpLoc, false, programInfoData.uMvpData);
    }
}

export class PointShader extends Shader
{
    static vertexShaderSource = `
        attribute vec2 a_position;
        void main()
        {
            gl_Position = vec4(a_position, 0.0, 0.0);
            gl_PointSize = 5.;
        }
    `

    static fragmentShaderSource = `
        precision mediump float;
        uniform vec2 u_resolution;

        void main()
        {
            vec2 uv = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
            gl_FragColor = vec4(vec3(0.), 1.0);
        }
    `

    static getProgramInfoLoc(gl, program)
    {
        return {
            attribLocs : {
                aPositionLoc : gl.getAttribLocation(program, 'a_position'),
            },

            uniformLocs : {
                uResolutionLoc : gl.getUniformLocation(program, "u_resolution"),
            }
        }
    }

    static createProgramInfoData(positionData, resolutionData)
    {
        return{
            aPositionData : positionData,
            uResolutionData : resolutionData,
        }
    }

    static initBuffers(gl)
    {
        return{
            positionBuffer : gl.createBuffer(),
        }
    }

    static setProgramInfo(gl, programInfoLoc, programInfoData, buffers)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(programInfoData.aPositionData), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(programInfoLoc.attribLocs.aPositionLoc);
        gl.vertexAttribPointer(
            programInfoLoc.attribLocs.aPositionLoc,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.uniform2fv(programInfoLoc.uniformLocs.uResolutionLoc, new Float32Array(programInfoData.uResolutionData));

    }
}
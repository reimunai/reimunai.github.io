import {mat4} from './glmatrix/dist/esm/index.mjs'

export class Transform
{
    position = [0, 0, 0];
    rotateXYZ = [0, 0, 0];
    scale = [1, 1, 1];

    getModelMatrix()
    {
        const modelMat = mat4.create();
        mat4.rotateX(modelMat, modelMat, this.rotateXYZ[0] * Math.PI/ 180);
        mat4.rotateY(modelMat, modelMat, this.rotateXYZ[1] * Math.PI/ 180);
        mat4.rotateZ(modelMat, modelMat, this.rotateXYZ[2] * Math.PI/ 180);
        mat4.scale(modelMat, modelMat, this.scale);
        mat4.translate(modelMat, modelMat, this.position);
        return modelMat;
    }
}

export class Camera
{
    constructor(
        position = [0.0, 0.0, 0.0],
        gazePosition = [0.0, 0.0, 0.0],
        viewUpVector3 = [0.0, 1.0, 0.0],
        fovy = 90,
        near = 0.1,
        far = 200.0,
        )
    {
        this.position = position;
        this.gazePosition = gazePosition;
        this.viewUpVector3 = viewUpVector3;
        this.fovy = 90;
        this.fovy = 90;
        this.near = 0.1;
        this.far = 200.0;
    }
    getViewMatrix()
    {
        const res = mat4.create();
        mat4.lookAt(res, this.position, this.gazePosition, this.viewUpVector3);
        return res;
    }

    getProjectionMatrix(canvas)
    {
        const res = mat4.create();
        mat4.perspectiveNO(res, this.fovy * Math.PI / 180, canvas.clientWidth / canvas.clientHeight, this.near, this.far);
        
        return res;
    }
}

export class Cube
{
    position = [
        // 前面 z = +0.5
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,

        -0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,

        // 后面 z = -0.5
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,

        0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,

        // 左面 x = -0.5
        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,

        -0.5, -0.5, -0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,

        // 右面 x = +0.5
        0.5, -0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,

        0.5, -0.5, 0.5,
        0.5, 0.5, -0.5,
        0.5, 0.5, 0.5,

        // 上面 y = +0.5
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,

        -0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,

        // 下面 y = -0.5
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,

        -0.5, -0.5, -0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
    ];

    color = [
        // 前面 z = +0.5
        0.0, 0.5, 0.5,
        0.5, 0.0, 0.5,
        0.5, 0.5, 0.0,

        0.5, 0.5, 0.0,
        0.5, 0.0, 0.5,
        0.0, 0.5, 0.5,

        // 后面 z = -0.5
        0.0, 0.5, 0.5,
        0.5, 0.0, 0.5,
        0.0, 0.5, 0.5,

        0.5, 0.5, 0.0,
        0.5, 0.0, 0.5,
        0.5, 0.5, 0.0,

        // 左面 x = -0.5
        0.5, 0.5, 0.0,
        0.5, 1.0, 0.5,
        1.0, 0.5, 0.5,

        1.0, 0.5, 0.0,
        0.5, 1.0, 0.5,
        0.5, 0.5, 1.0,

        // 右面 x = +0.5
        0.5, 0.5, 1.0,
        0.5, 1.0, 0.5,
        1.0, 1.0, 0.5,

        0.0, 1.0, 0.5,
        0.5, 0.0, 0.5,
        0.5, 0.5, 0.0,

        // 上面 y = +0.5
        0.5, 0.5, 1.0,
        0.5, 0.5, 1.0,
        0.5, 0.0, 1.0,

        1.0, 0.5, 0.5,
        0.5, 0.5,1.0,
        1.0, 0.5, 0.5,

        // 下面 y = -0.5
        1.0, 0.5, 0.5,
        0.5, -0.5, 0.5,
        0.5, 0.5, 0.5,

        0.5, 1.0, 0.5,
        0.5, 0.0, 0.5,
        0.5, 0.5, 0.5,
    ];
}

export class Usuario {

    public _nombre: string
    private _contrasena: string
    private _contrasena_conf: string
    private _fecha_nac: any
    private _localidad: string
    private _pais: string
    private _nombre_spotify: string
    private _enlace_foto: string
    private _descripcion: string

    constructor() {
        this._nombre = "";
        this._contrasena = "";
        this._contrasena_conf = "";
        this._fecha_nac = "";
        this._localidad = "";
        this._pais = "";
        this._nombre_spotify = "";
        this._enlace_foto = "";
        this._descripcion = "";
    }

    public getNombre(): any {
        return this._nombre
    }
    public setNombre(value: any) {
        this._nombre = value
    }
    public get contrasena(): any {
        return this._contrasena
    }
    public set contrasena(value: any) {
        this._contrasena = value
    }
    
    public get contrasena_conf(): any {
        return this._contrasena_conf
    }
    public set contrasena_conf(value: any) {
        this._contrasena_conf = value
    }

    public get fecha_nac(): any {
        return this._fecha_nac
    }
    public set fecha_nac(value: any) {
        this._fecha_nac = value
    }
    
    public get localidad(): any {
        return this._localidad
    }
    public set localidad(value: any) {
        this._localidad = value
    }
    
    public get pais(): any {
        return this._pais
    }
    public set pais(value: any) {
        this._pais = value
    }
    
    public get nombre_spotify(): any {
        return this._nombre_spotify
    }
    public set nombre_spotify(value: any) {
        this._nombre_spotify = value
    }
    
    public get enlace_foto(): any {
        return this._enlace_foto
    }
    public set enlace_foto(value: any) {
        this._enlace_foto = value
    }
    
    public get descripcion(): any {
        return this._descripcion
    }
    public set descripcion(value: any) {
        this._descripcion = value
    }

  }
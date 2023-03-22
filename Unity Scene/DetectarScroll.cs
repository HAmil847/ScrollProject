using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class DetectarScroll : MonoBehaviour
{
    public Animator elevator; //anim elevator controlller
    public int animationTime; //tiempo de la animacion

    public GameObject [] models; //los modelos
    public GameObject currentModel; //modelo actual

    public int indexModel; //indice actual del modelo
    public GameObject count;
    public Transform pivot;
    public int indexPrueba;
    public bool ok;

    private void Start()
    {
        //realizar animacion
        doAnimation(elevator);

        //instance first model
        StartCoroutine(InstanceModel(animationTime, 1, count, pivot));

        //setear el primer modelo
        indexModel = 1;
    }
    private void Update()
    {
        if (ok)
        {
            setModel(indexPrueba);
        }

    }
    #region Metodos
    public void setModel(int index)
    {

        //comprobar que es otro indice
        if (index != indexModel)
        {
            //realizar animacion
            doAnimation(elevator);

            //esperar unos segundo y instanciar el nuevo
            StartCoroutine(InstanceModel(animationTime, index, count, pivot));
           
            //actualizar el indice
            indexModel = index;
            Debug.Log("Modelo Instanciado");
        }
    }

    #endregion

    #region Animation
    public void doAnimation(Animator anim)
    {
        anim.SetTrigger("doorClose");
    }

    //esperar unos segundo
    IEnumerator InstanceModel(int time, int index, GameObject obj, Transform pivot)
    {
        Debug.Log("Comenzando...");
        yield return new WaitForSeconds(time);

        //destruir obj actual
        if(currentModel != null) Destroy(currentModel);

        ////intanciar el nuevo modelo
        if (index == 3)
        {
            currentModel = Instantiate(models[index], pivot.position, models[index].transform.rotation);
            Debug.Log($"Han pasado {time} segundos!");
        }
        else
        {
            currentModel = Instantiate(models[index], pivot.position, pivot.rotation);
            Debug.Log($"Han pasado {time} segundos!");
        }
        
    }
    #endregion


}

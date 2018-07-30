### 说明

+ 本目录为k8s集群的插件 coredns的配置目录，初始为空目录
+ 因coredns.yaml文件中参数(CLUSTER_DNS_SVC_IP, CLUSTER_DNS_DOMAIN)根据hosts文件设置而定，需要使用ansible template模块替换参数后生成
+ 运行 `ansible-playbook 07.cluster-addon.yml`后会生成该目录下的coredns.yaml 文件
+ coredns.yaml [模板文件](../../roles/cluster-addon/templates/coredns.yaml.j2)

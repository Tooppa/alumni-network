import type { NextPage } from "next";
import React from "react";
import CardGrid from "../../Components/Layout/CardGrid";
import GroupPreview from "../../Components/GroupPreview";
import CreateGroup from "./CreateGroup";
import { GroupType } from "../../Types/Data";
import { KeycloakInstance } from "keycloak-js";
import { useKeycloak } from "@react-keycloak/ssr";
import { useQuery } from "react-query";
import { getGroups } from "../../Queries/Group";
import Head from "next/head";

type GroupCardProps = {
    children: React.ReactNode
}

const Groups: NextPage<GroupCardProps> = () => {
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const token: string | undefined = keycloak?.token;
    const { data, status } = useQuery<Array<GroupType>>('groups', () => getGroups(token), { enabled: !!token })

    return (
      <>
        <Head>
          <title>Groups | Alumni Network</title>
          <meta name="description" content="Welcome to Alumni Network" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CreateGroup />
        {status === 'success' ?
        <CardGrid>
          {data?.map((g, id) => (
            <GroupPreview key={id} groupPreview={g} />
          ))}
        </CardGrid>
        :
        // TODO: Implement loading placeholders and/or show error when status is 'error'?
        <></>
        }
        </>
    )
}

export default Groups